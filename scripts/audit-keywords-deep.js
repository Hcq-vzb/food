const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, '..', 'bundle.js'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const pyramid = JSON.parse(fs.readFileSync(path.join(__dirname, 'keyword-pyramid.json'), 'utf8'));

const warnings = [];
const issues = [];

// Extract kc object titles
const kcStart = bundle.indexOf('var kc={');
const kcEnd = bundle.indexOf('};var hc=[');
const kcStr = bundle.substring(kcStart + 7, kcEnd + 1);
let kc;
try {
  kc = Function('return ' + kcStr)();
} catch (e) {
  issues.push('kc parse failed: ' + e.message);
  kc = {};
}

console.log('=== CATEGORY TITLE vs PRIMARY KEYWORD ===');
for (const [cat, primary] of Object.entries(pyramid.tiers.tier2_categories)) {
  const entry = kc[cat];
  if (!entry) {
    issues.push(`category missing in kc: ${cat}`);
    continue;
  }
  const title = entry.t.toLowerCase();
  const words = primary.toLowerCase().split(' ').filter((w) => w.length > 3);
  const hit = words.filter((w) => title.includes(w)).length;
  const status = hit >= Math.min(2, words.length) ? 'OK' : 'WEAK';
  if (status === 'WEAK') warnings.push(`category title weak for "${cat}": "${entry.t}" (primary: ${primary})`);
  console.log(`  [${status}] ${cat}: ${entry.t}`);
}

// Home carousel slides
console.log('\n=== HOME CAROUSEL SLIDES (H1 rotates) ===');
const slideMatches = [...bundle.matchAll(/title:"([^"]+)",desc:"([^"]+)"/g)];
slideMatches.slice(0, 6).forEach((m, i) => {
  console.log(`  slide ${i + 1}: ${m[1]}`);
  if (i > 0 && m[1].toLowerCase().includes('wholesale food additives manufacturer')) {
    warnings.push('multiple carousel slides compete on same home keyword');
  }
});

// Check if H1 uses carousel
if (bundle.includes('children:e[n].title') || bundle.includes('children:e[r].title')) {
  warnings.push('home H1 rotates with carousel — only first slide is keyword-optimized');
}

// Product sample - find sc array
const scStart = bundle.indexOf('var sc=[');
if (scStart >= 0) {
  const sample = bundle.substring(scStart, scStart + 500);
  const nameMatch = sample.match(/name:"([^"]+)"/);
  const catMatch = sample.match(/category:"([^"]+)"/);
  if (nameMatch) {
    const expectedTitle = `${nameMatch[1]} Supplier China | Wholesale ${catMatch ? catMatch[1] : '?'}`;
    console.log('\n=== L3 PRODUCT SAMPLE ===');
    console.log('  first product:', nameMatch[1]);
    console.log('  expected title pattern:', expectedTitle);
    if (!bundle.includes('Supplier China | Wholesale ')) issues.push('product title template broken');
  }
}

// Static JSON-LD in index vs dynamic pages
console.log('\n=== STRUCTURED DATA ===');
if (index.includes('knowsAbout')) {
  console.log('  ✓ Organization JSON-LD in index.html (static)');
} else {
  issues.push('Organization JSON-LD missing from index.html');
}
if (bundle.includes('BreadcrumbList')) {
  console.log('  ✓ BreadcrumbList on product pages');
} else {
  warnings.push('no BreadcrumbList JSON-LD');
}
if (!bundle.includes('@type":"Product"') && !bundle.includes('"@type":"Product"')) {
  warnings.push('no Product JSON-LD on product detail pages');
}

// Canonical per page type
console.log('\n=== CANONICAL URLS ===');
const canonPatterns = [
  ['home', 'foodingredientschina.com/"'],
  ['products', 'foodingredientschina.com/products"'],
  ['product detail', 'foodingredientschina.com/products/"+'],
];
for (const [page, pat] of canonPatterns) {
  console.log(`  ${bundle.includes(pat) ? '✓' : '✗'} ${page}`);
}

// Duplicate / competing titles
console.log('\n=== POTENTIAL CANNIBALIZATION ===');
const titles = [...bundle.matchAll(/children:"([^"]{20,70}\|[^"]+)"/g)].map((m) => m[1]);
const titleCount = {};
titles.forEach((t) => { titleCount[t] = (titleCount[t] || 0) + 1; });
const dupes = Object.entries(titleCount).filter(([, c]) => c > 1);
if (dupes.length) {
  dupes.forEach(([t, c]) => warnings.push(`duplicate title (${c}x): ${t}`));
} else {
  console.log('  ✓ no duplicate page titles detected');
}

// FAQ OEM in body copy (OK as service mention, not title)
if (bundle.includes('shipping and OEM')) {
  console.log('  ℹ FAQ body mentions OEM (acceptable in content, not in title)');
}

console.log('\n=== SUMMARY ===');
console.log('Issues:', issues.length);
issues.forEach((i) => console.log('  ✗', i));
console.log('Warnings:', warnings.length);
warnings.forEach((w) => console.log('  ⚠', w));
