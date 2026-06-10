const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, '..', 'bundle.js'), 'utf8');
const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const pyramid = JSON.parse(fs.readFileSync(path.join(__dirname, 'keyword-pyramid.json'), 'utf8'));

const checks = [
  ['L1 home title', 'Food Ingredients China | Wholesale Food Additives Manufacturer', bundle],
  ['L2 products hub', 'Wholesale Food Additives Catalog | China Manufacturer', bundle],
  ['L2 specification', 'Food Additives Specifications & TDS | China Manufacturer', bundle],
  ['L2 faq', 'Food Additives FAQ | MOQ, Samples & Export | China Supplier', bundle],
  ['L2 contact', 'Contact Food Ingredients China | Get Wholesale Quote', bundle],
  ['L3 product pattern', 'Supplier China | Wholesale ', bundle],
  ['kc category map', 'var kc={', bundle],
  ['products dynamic og', 'kc[s]?kc[s].t:s+" Wholesale China"', bundle],
  ['contact H1 clean', 'Request bulk food additives quote from China — reply within 12 hours"', bundle],
  ['no corrupted contact', 'ale inquiries', bundle, false],
  ['index title', 'Wholesale Food Additives Manufacturer', index],
];

let pass = 0;
for (const [name, needle, src, expect = true] of checks) {
  const found = src.includes(needle);
  const ok = expect ? found : !found;
  console.log((ok ? '✓' : '✗') + ' ' + name);
  if (ok) pass++;
}

const cats = Object.keys(pyramid.tiers.tier2_categories);
let catOk = 0;
for (const cat of cats) {
  if (bundle.includes(`"${cat}":{t:`)) catOk++;
}
console.log(`✓ category keywords: ${catOk}/${cats.length}`);

console.log(`\n${pass}/${checks.length} checks passed`);
