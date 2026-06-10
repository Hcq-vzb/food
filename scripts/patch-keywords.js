const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
const indexPath = path.join(__dirname, '..', 'index.html');
let b = fs.readFileSync(bundlePath, 'utf8');

// Tier 2 category keyword map (unique primary keyword per page — anti-cannibalization)
const kcInsert = `var kc={"Thickeners":{t:"Thickeners Supplier China | Wholesale Xanthan Gum & CMC",d:"China thickeners supplier — xanthan gum, CMC, guar gum wholesale. ISO certified bulk thickening agents for dairy, sauces and bakery. MOQ 1 ton."},"Emulsifiers":{t:"Food Emulsifiers Supplier China | Span & Tween Wholesale",d:"Wholesale food emulsifiers from China — span 80, tween 80, sucrose esters bulk supply. ISO certified emulsifier manufacturer for bakery and dairy."},"Food Ingredients":{t:"Food Ingredients Wholesale China | Bulk Supplier",d:"Wholesale food ingredients from China — whey powder, caseinate, honey and specialty ingredients. Bulk B2B supply for global food manufacturers."},"Flavors":{t:"Food Flavors Supplier China | Wholesale Flavorings",d:"China food flavors supplier — natural and artificial flavorings wholesale. Custom formulations for beverages, confectionery and savory products."},"Sweeteners":{t:"Sweeteners Wholesale China | Stevia & Sucralose Supplier",d:"Wholesale sweeteners from China — stevia, sucralose, erythritol bulk supply. Natural and artificial sweeteners for beverages and food. MOQ 500kg–1 ton."},"Hydrocolloids":{t:"Hydrocolloids Supplier China | Wholesale Food Grade",d:"China hydrocolloids supplier — gellan gum, pectin, agar wholesale. Food-grade hydrocolloids for texture, gelling and stabilization applications."},"Acids & Salts":{t:"Food Acids & Salts Supplier China | Bulk Wholesale",d:"Wholesale food acids and salts from China — citric acid, sodium chloride, phosphates. Bulk supply for food processing and beverage industries."},"Preservatives":{t:"Food Preservatives Manufacturer China | Bulk Supplier",d:"China food preservatives manufacturer — sodium benzoate, potassium sorbate, sorbic acid wholesale. Extend shelf life for global food producers."},"Antioxidants":{t:"Food Antioxidants Supplier China | Wholesale BHA & BHT",d:"Wholesale food antioxidants from China — BHA, BHT, ascorbic acid bulk supply. Protect food quality and extend shelf life for manufacturers."},"Water Retention Agents":{t:"Water Retention Agents China | Phosphate Wholesale",d:"China water retention agents supplier — phosphate blends wholesale for meat and seafood processing. Improve yield and texture in food production."},"Colorants":{t:"Food Colorants Supplier China | Natural & Synthetic",d:"Wholesale food colorants from China — natural and synthetic dyes for confectionery, beverages and dairy. ISO certified color additive supplier."},"Nutritional Enhancers":{t:"Nutritional Enhancers China | Food Fortification Wholesale",d:"China nutritional enhancers supplier — vitamins, minerals and fortification blends wholesale for functional foods and beverages."},"Nutritional Fortifiers":{t:"Nutritional Fortifiers China | Food Supplement Wholesale",d:"Wholesale nutritional fortifiers from China — amino acids, proteins and micronutrient blends for food fortification and supplements."},"Edible Oils":{t:"Edible Oils Wholesale China | Food Grade Supplier",d:"China edible oils supplier — coconut oil, palm oil and specialty oils wholesale. Food-grade bulk oils for processing and manufacturing."},"Condiments":{t:"Food Condiments Supplier China | Bulk Wholesale",d:"Wholesale food condiments from China — sauces, seasonings and specialty condiment ingredients for global food brands."},"Novel Foods":{t:"Novel Food Ingredients China | Innovative Wholesale Supply",d:"China novel food ingredients supplier — innovative and specialty ingredients wholesale for modern food formulations and clean-label products."},"Other Foods":{t:"Specialty Food Ingredients China | Wholesale Supplier",d:"Wholesale specialty food ingredients from China. Custom and standard ingredients for diverse food processing applications worldwide."},"Oil & Fat Exchange":{t:"Fat Replacers China | Oil & Fat Exchange Wholesale",d:"China oil and fat exchange products supplier — fat replacers and lipid ingredients wholesale for low-fat and reformulated food products."}};`;

if (!b.includes('var kc={')) {
  b = b.replace('var hc=[', kcInsert + 'var hc=[');
  console.log('Inserted kc keyword map');
}

const replacements = [
  // === TIER 1: Homepage ===
  [
    'children:"Food Ingredients China | OEM Food Additives Wholesale Manufacturer"}),(0,ut.jsx)("meta",{name:"description",content:"Leading China food ingredient manufacturer specializing in wholesale food additives, thickeners, sweeteners, and preservatives. Export to Europe, Middle East & Africa."}',
    'children:"Food Ingredients China | Wholesale Food Additives Manufacturer"}),(0,ut.jsx)("meta",{name:"description",content:"China food ingredients manufacturer & wholesale supplier of food additives — thickeners, sweeteners, emulsifiers & preservatives. ISO certified. Export to 30+ countries."}',
  ],
  [
    'property:"og:title",content:"Food Ingredients China | OEM Food Additives Wholesale Manufacturer"}),(0,ut.jsx)("meta",{property:"og:description",content:"Leading China food ingredient manufacturer specializing in wholesale food additives, thickeners, sweeteners, and preservatives."}',
    'property:"og:title",content:"Food Ingredients China | Wholesale Food Additives Manufacturer"}),(0,ut.jsx)("meta",{property:"og:description",content:"China food ingredients manufacturer & wholesale supplier of food additives. ISO certified. Export worldwide."}',
  ],
  [
    'name:"twitter:title",content:"Food Ingredients China | OEM Food Additives Wholesale Manufacturer"}),(0,ut.jsx)("meta",{name:"twitter:description",content:"Leading China food ingredient manufacturer specializing in wholesale food additives."}',
    'name:"twitter:title",content:"Food Ingredients China | Wholesale Food Additives Manufacturer"}),(0,ut.jsx)("meta",{name:"twitter:description",content:"China wholesale food additives manufacturer. Thickeners, sweeteners, emulsifiers & preservatives."}',
  ],
  [
    'title:"Premium Food Additives Solutions",desc:"Leading manufacturer of high-quality food additives including thickeners, stabilizers, and emulsifiers for global markets."',
    'title:"Wholesale Food Additives Manufacturer China",desc:"Leading China manufacturer of wholesale food additives — thickeners, sweeteners, emulsifiers and preservatives for global B2B buyers."',
  ],

  // === TIER 2: Products hub ===
  [
    '"All"===s?"Wholesale Food Additives & Ingredients | China Manufacturer Catalog":s+" Food Additives Wholesale | China Manufacturer"}),(0,ut.jsx)("meta",{name:"description",content:"All"===s?"Browse our comprehensive catalog of wholesale food additives including emulsifiers, thickeners, sweeteners, and preservatives. Direct from China manufacturer.":"Wholesale "+s.toLowerCase()+" from China manufacturer. ISO certified food additives for global B2B buyers."}',
    '"All"===s?"Wholesale Food Additives Catalog | China Manufacturer":kc[s]?kc[s].t:s+" Wholesale China | Food Additives Supplier"}),(0,ut.jsx)("meta",{name:"description",content:"All"===s?"Browse 97+ wholesale food additives from China — emulsifiers, thickeners, sweeteners, preservatives & more. ISO certified bulk supplier for global B2B.":kc[s]?kc[s].d:"Wholesale "+s+" from China manufacturer. ISO certified bulk food additives for global B2B buyers."}',
  ],
  [
    'property:"og:title",content:"All"===s?"Wholesale Food Additives & Ingredients | China Manufacturer Catalog":s+" Food Additives Wholesale | China Manufacturer"}),(0,ut.jsx)("meta",{property:"og:description",content:"All"===s?"Browse our comprehensive catalog of wholesale food additives including emulsifiers, thickeners, sweeteners, and preservatives.":"Wholesale "+s.toLowerCase()+" from China manufacturer for global B2B buyers."}',
    'property:"og:title",content:"All"===s?"Wholesale Food Additives Catalog | China Manufacturer":kc[s]?kc[s].t:s+" Wholesale China"}),(0,ut.jsx)("meta",{property:"og:description",content:"All"===s?"Browse 97+ wholesale food additives from China manufacturer.":kc[s]?kc[s].d:"Wholesale "+s+" from China."}',
  ],
  [
    'children:["Our ",(0,ut.jsx)("span",{className:"text-blue-200",children:"Products"})]}),(0,ut.jsx)("p",{className:"text-lg text-blue-100 max-w-2xl mx-auto font-light",children:"Professional manufacturer of high-quality food ingredients and additives"',
    'children:"All"===s?"Wholesale Food Additives Catalog":kc[s]?kc[s].t.split("|")[0].trim():s+" Wholesale China"}),(0,ut.jsx)("p",{className:"text-lg text-blue-100 max-w-2xl mx-auto font-light",children:"All"===s?"97+ food additives from China manufacturer — emulsifiers, thickeners, sweeteners & preservatives for global B2B buyers":kc[s]?kc[s].d.split(".")[0]+".":"ISO certified bulk "+s.toLowerCase()+" supplier from China"',
  ],

  // === TIER 3: Product detail ===
  [
    'children:[l.name," - Food Ingredients Supplier | ",l.category]}),(0,ut.jsx)("meta",{name:"description",content:l.advantages})',
    'children:[l.name," Supplier China | Wholesale ",l.category," | Food Ingredients China"]}),(0,ut.jsx)("meta",{name:"description",content:l.advantages+". Bulk "+l.name+" supply from China manufacturer. MOQ 1 ton. Request wholesale quote."})',
  ],
  [
    'content:l.name+" | Food Ingredients China"}),(0,ut.jsx)("meta",{property:"og:description",content:l.advantages})',
    'content:l.name+" Supplier China | Wholesale "+l.category}),(0,ut.jsx)("meta",{property:"og:description",content:l.advantages+". Bulk supply from China manufacturer."})',
  ],

  // === TIER 2: Specification ===
  [
    'children:"Food Additives Specifications | Technical Data Sheets"}),(0,ut.jsx)("meta",{name:"description",content:"Technical specifications for food additives including CAS numbers, purity levels, and applications. CE and ISO certified products from China manufacturer."}',
    'children:"Food Additives Specifications & TDS | China Manufacturer"}),(0,ut.jsx)("meta",{name:"description",content:"Food additives specifications, CAS numbers, purity levels and technical data sheets. ISO & CE certified wholesale food ingredients from China manufacturer."}',
  ],
  [
    'property:"og:title",content:"Food Additives Specifications | Technical Data Sheets"}),(0,ut.jsx)("meta",{property:"og:description",content:"Technical specifications for food additives including CAS numbers, purity levels, and applications."}',
    'property:"og:title",content:"Food Additives Specifications & TDS | China Manufacturer"}),(0,ut.jsx)("meta",{property:"og:description",content:"Food additives specifications, CAS numbers and technical data sheets from China manufacturer."}',
  ],
  [
    'children:"Product Specifications"}),(0,ut.jsx)("p",{className:"text-base text-blue-50 max-w-2xl mx-auto",children:"Technical data sheets for our food additive products"',
    'children:"Food Additives Specifications & TDS"}),(0,ut.jsx)("p",{className:"text-base text-blue-50 max-w-2xl mx-auto",children:"CAS numbers, purity levels and technical data sheets for wholesale food additives"',
  ],

  // === TIER 2: FAQ ===
  [
    'children:"Food Additives FAQ | China Manufacturer Support & Technical Info"}),(0,ut.jsx)("meta",{name:"description",content:"Frequently asked questions about our food ingredients, MOQ, certifications, shipping, and OEM services. Professional support for global B2B buyers."}',
    'children:"Food Additives FAQ | MOQ, Samples & Export | China Supplier"}),(0,ut.jsx)("meta",{name:"description",content:"FAQ about wholesale food additives from China — MOQ, free samples, ISO certifications, shipping to Europe, Middle East & Africa, and OEM services."}',
  ],
  [
    'property:"og:title",content:"Food Additives FAQ | China Manufacturer Support & Technical Info"}),(0,ut.jsx)("meta",{property:"og:description",content:"Frequently asked questions about our food ingredients, MOQ, certifications, shipping, and OEM services."}',
    'property:"og:title",content:"Food Additives FAQ | MOQ, Samples & Export | China Supplier"}),(0,ut.jsx)("meta",{property:"og:description",content:"FAQ about wholesale food additives — MOQ, samples, certifications, shipping and OEM from China."}',
  ],
  [
    'children:"Frequently Asked Questions"}),(0,ut.jsx)("p",{className:"text-base text-blue-50 max-w-2xl mx-auto",children:"Answers to common questions about our products and services"',
    'children:"Food Additives FAQ — Wholesale from China"}),(0,ut.jsx)("p",{className:"text-base text-blue-50 max-w-2xl mx-auto",children:"MOQ, samples, certifications, shipping and OEM — answers for global B2B buyers"',
  ],

  // === TIER 2: Contact ===
  [
    'children:"Contact Food Ingredients China | Wholesale Additives Inquiry"}),(0,ut.jsx)("meta",{name:"description",content:"Contact us for wholesale food additives inquiries. Get quotes for thickeners, sweeteners, and preservatives. Global export to Europe, Middle East & Africa."}',
    'children:"Contact Food Ingredients China | Get Wholesale Quote"}),(0,ut.jsx)("meta",{name:"description",content:"Request a wholesale food additives quote from China. Bulk supply of thickeners, sweeteners, emulsifiers & preservatives. Reply within 12 hours. Export worldwide."}',
  ],
  [
    'property:"og:title",content:"Contact Food Ingredients China | Wholesale Additives Inquiry"}),(0,ut.jsx)("meta",{property:"og:description",content:"Contact us for wholesale food additives inquiries. Get quotes for thickeners, sweeteners, and preservatives."}',
    'property:"og:title",content:"Contact Food Ingredients China | Get Wholesale Quote"}),(0,ut.jsx)("meta",{property:"og:description",content:"Request wholesale food additives quote from China. Bulk thickeners, sweeteners and preservatives."}',
  ],
  [
    'children:"Contact Us"}),(0,ut.jsx)("p",{className:"text-lg text-blue-100 max-w-2xl mx-auto font-light",children:"Get in touch for wholesale inquiries and product information"',
    'children:"Contact Our Wholesale Team"}),(0,ut.jsx)("p",{className:"text-lg text-blue-100 max-w-2xl mx-auto font-light",children:"Request bulk food additives quote from China — reply within 12 hours"',
  ],
];

let ok = 0;
let fail = 0;
for (const [oldStr, newStr] of replacements) {
  if (b.includes(oldStr)) {
    b = b.replace(oldStr, newStr);
    ok++;
  } else {
    console.warn('MISSING:', oldStr.slice(0, 80) + '...');
    fail++;
  }
}
console.log(`Bundle: ${ok} replaced, ${fail} missing`);

fs.writeFileSync(bundlePath, b);

// index.html Tier 1 sync
let idx = fs.readFileSync(indexPath, 'utf8');
idx = idx
  .replace(
    '<title>Food Ingredients China | OEM Food Additives Wholesale Manufacturer</title>',
    '<title>Food Ingredients China | Wholesale Food Additives Manufacturer</title>'
  )
  .replace(
    'content="Professional Chinese manufacturer of food ingredients, natural food additives, thickeners, sweeteners and preservatives. Export to Europe, Middle East, Africa."',
    'content="China food ingredients manufacturer &amp; wholesale supplier of food additives — thickeners, sweeteners, emulsifiers &amp; preservatives. ISO certified. Export to 30+ countries."'
  )
  .replace(
    'content="Food Ingredients China | OEM Food Additives Wholesale Manufacturer"',
    'content="Food Ingredients China | Wholesale Food Additives Manufacturer"'
  )
  .replace(
    'content="Professional Chinese manufacturer of food ingredients, natural food additives, thickeners, sweeteners and preservatives. Export to Europe, Middle East, Africa."',
    'content="China food ingredients manufacturer &amp; wholesale supplier of food additives. ISO certified. Export worldwide."'
  )
  .replace(
    'content="Professional Chinese manufacturer of food ingredients and wholesale food additives."',
    'content="China wholesale food additives manufacturer. Thickeners, sweeteners, emulsifiers &amp; preservatives."'
  )
  .replace(
    '<h1>Food Ingredients China — Wholesale Food Additives Manufacturer</h1>',
    '<h1>Wholesale Food Additives Manufacturer China — Food Ingredients China</h1>'
  )
  .replace(
    '"description": "Leading China food ingredient manufacturer specializing in wholesale food additives, thickeners, sweeteners, and preservatives."',
    '"description": "China food ingredients manufacturer and wholesale supplier of food additives including thickeners, sweeteners, emulsifiers and preservatives."'
  )
  .replace(
    '"knowsAbout": ["food additives", "food ingredients", "thickeners", "sweeteners", "preservatives", "emulsifiers"]',
    '"knowsAbout": ["food additives", "food ingredients", "wholesale food additives", "thickeners supplier", "sweeteners wholesale", "food emulsifiers", "preservatives manufacturer", "china food ingredient supplier"]'
  );

fs.writeFileSync(indexPath, idx);
console.log('index.html updated');
