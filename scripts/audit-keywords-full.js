const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, '..', 'bundle.js'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
const pyramid = JSON.parse(fs.readFileSync(path.join(__dirname, 'keyword-pyramid.json'), 'utf8'));

const issues = [];
const passes = [];

function ok(msg) { passes.push(msg); }
function fail(msg) { issues.push(msg); }

// --- Tier checks from pyramid ---
const tierChecks = [
  ['/', 'Food Ingredients China | Wholesale Food Additives Manufacturer', 'L1 home'],
  ['/products', 'Wholesale Food Additives Catalog | China Manufacturer', 'L2 products'],
  ['/specification', 'Food Additives Specifications & TDS | China Manufacturer', 'L2 spec'],
  ['/faq', 'Food Additives FAQ | MOQ, Samples & Export | China Supplier', 'L2 faq'],
  ['/contact', 'Contact Food Ingredients China | Get Wholesale Quote', 'L2 contact'],
];

for (const [, title, label] of tierChecks) {
  bundle.includes(title) ? ok(`${label} title in bundle`) : fail(`${label} title MISSING in bundle`);
  index.includes(title) && label === 'L1 home' ? ok('L1 title in index.html') : null;
}

// Category map kc
const cats = Object.keys(pyramid.tiers.tier2_categories);
let catMissing = [];
for (const cat of cats) {
  if (!bundle.includes(`"${cat}":{t:`)) catMissing.push(cat);
}
catMissing.length ? fail(`kc missing categories: ${catMissing.join(', ')}`) : ok(`all ${cats.length} category keywords in kc`);

// Product L3 pattern
bundle.includes('Supplier China | Wholesale ') ? ok('L3 product title pattern') : fail('L3 product title pattern missing');
bundle.includes('Bulk "+l.name+" supply from China') ? ok('L3 product description pattern') : fail('L3 product description pattern missing');

// Cannibalization / legacy OEM
const oemHits = [];
['OEM Food Additives', 'OEM For', 'Leading China food ingredient manufacturer specializing'].forEach((p) => {
  if (bundle.includes(p)) oemHits.push(`bundle: ${p}`);
  if (index.includes(p)) oemHits.push(`index: ${p}`);
});
if (fs.existsSync(path.join(__dirname, '..', '404.html'))) {
  const html404 = fs.readFileSync(path.join(__dirname, '..', '404.html'), 'utf8');
  if (html404.includes('OEM')) oemHits.push('404.html: OEM');
}
oemHits.length ? fail(`Legacy OEM/branding still present: ${oemHits.join('; ')}`) : ok('no legacy OEM keywords');

// Contact page corruption
bundle.includes('ale inquiries') ? fail('Contact page corrupted text still present') : ok('contact page text clean');

// H1 alignment
const h1Checks = [
  ['home hero keyword', 'Wholesale Food Additives Manufacturer China'],
  ['products hub H1', 'Wholesale Food Additives Catalog'],
  ['spec H1', 'Food Additives Specifications & TDS'],
  ['faq H1', 'Food Additives FAQ'],
  ['contact H1', 'Contact Our Wholesale Team'],
];
for (const [label, text] of h1Checks) {
  bundle.includes(text) ? ok(`H1: ${label}`) : fail(`H1 missing: ${label} (${text})`);
}

// Dynamic SEO infrastructure
const infra = [
  ['canonical dynamic', 'rel:"canonical"'],
  ['og:title products dynamic', 'kc[s]?kc[s].t'],
  ['og:description products dynamic', 'kc[s]?kc[s].d'],
  ['JSON-LD Organization', 'knowsAbout', index],
  ['product breadcrumb JSON-LD', 'BreadcrumbList'],
];
for (const [label, pat] of infra) {
  bundle.includes(pat) ? ok(`infra: ${label}`) : fail(`infra missing: ${label}`);
}

// keywords meta tag removed (deprecated)
bundle.includes('name:"keywords"') ? fail('deprecated keywords meta tag still present') : ok('no deprecated keywords meta');

// Sitemap coverage
const hubUrls = ['<loc>https://foodingredientschina.com/</loc>', '<loc>https://foodingredientschina.com/products</loc>',
  '<loc>https://foodingredientschina.com/specification</loc>', '<loc>https://foodingredientschina.com/faq</loc>',
  '<loc>https://foodingredientschina.com/contact</loc>'];
for (const u of hubUrls) {
  sitemap.includes(u) ? ok(`sitemap: ${u.match(/\/([^<]+)</)[1]}`) : fail(`sitemap missing: ${u}`);
}

const catUrlCount = (sitemap.match(/products\?category=/g) || []).length;
catUrlCount >= 18 ? ok(`sitemap category URLs: ${catUrlCount}`) : fail(`sitemap category URLs only ${catUrlCount}, expected 18`);

const productUrlCount = (sitemap.match(/<loc>https:\/\/foodingredientschina\.com\/products\/[^<]+<\/loc>/g) || []).length;
productUrlCount >= 90 ? ok(`sitemap product URLs: ${productUrlCount}`) : fail(`sitemap product URLs only ${productUrlCount}`);

// Sample product data vs SEO
const productIds = [...bundle.matchAll(/id:"([^"]+)",name:"([^"]+)",category:"([^"]+)"/g)].slice(0, 5);
if (productIds.length === 0) {
  const alt = [...bundle.matchAll(/id:"([^"]+)"/g)].length;
  ok(`product records found (~${alt} ids)`);
}

// Email consistency
bundle.includes('saler@foodingredientschina.com') && index.includes('saler@foodingredientschina.com')
  ? ok('email consistent (saler@)')
  : fail('email mismatch between index and bundle');

// Twitter/index sync
index.includes('twitter:title" content="Food Ingredients China | Wholesale Food Additives Manufacturer"')
  ? ok('index twitter:title synced')
  : fail('index twitter:title not synced with L1');

// Potential SEO weaknesses (warnings, not hard fails)
const warnings = [];
if (bundle.includes('title:"Premium Food Additives Solutions"')) warnings.push('home carousel still has old slide titles');
if (!bundle.includes('itemListElement')) warnings.push('no ItemList JSON-LD for product catalog');
const carouselH1 = bundle.match(/children:e\[.{0,30}\]\.title/g);
if (carouselH1) warnings.push('home H1 uses carousel rotation (not fixed keyword H1)');

console.log('=== KEYWORD PYRAMID AUDIT ===\n');
console.log(`PASS: ${passes.length}`);
passes.forEach((p) => console.log('  ✓', p));
console.log(`\nISSUES: ${issues.length}`);
issues.forEach((i) => console.log('  ✗', i));
if (warnings.length) {
  console.log(`\nWARNINGS: ${warnings.length}`);
  warnings.forEach((w) => console.log('  ⚠', w));
}
console.log(`\nScore: ${passes.length}/${passes.length + issues.length} (${issues.length === 0 ? 'HEALTHY' : 'NEEDS FIX'})`);
process.exit(issues.length > 0 ? 1 : 0);
