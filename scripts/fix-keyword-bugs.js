const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
let b = fs.readFileSync(bundlePath, 'utf8');

const fixes = [
  [
    'Request bulk food additives quote from China — reply within 12 hours"ale inquiries and custom solutions"',
    'Request bulk food additives quote from China — reply within 12 hours"',
  ],
  [
    'property:"og:title",content:"All"===s?"Wholesale Food Additives & Ingredients | China Manufacturer Catalog":s+" Food Additives Wholesale | China Manufacturer"}),(0,ut.jsx)("meta",{property:"og:description",content:"All"===s?"Browse our comprehensive catalog of wholesale food additives including emulsifiers, thickeners, sweeteners, and preservatives.":"Wholesale "+s.toLowerCase()+" from China manufacturer for global B2B buyers."}',
    'property:"og:title",content:"All"===s?"Wholesale Food Additives Catalog | China Manufacturer":kc[s]?kc[s].t:s+" Wholesale China"}),(0,ut.jsx)("meta",{property:"og:description",content:"All"===s?"Browse 97+ wholesale food additives from China manufacturer.":kc[s]?kc[s].d:"Wholesale "+s+" from China."}',
  ],
];

let ok = 0;
for (const [oldStr, newStr] of fixes) {
  if (b.includes(oldStr)) {
    b = b.replace(oldStr, newStr);
    ok++;
    console.log('Fixed:', oldStr.slice(0, 60) + '...');
  } else {
    console.warn('NOT FOUND:', oldStr.slice(0, 60) + '...');
  }
}

fs.writeFileSync(bundlePath, b);
console.log(`Done: ${ok}/${fixes.length} fixes applied`);
