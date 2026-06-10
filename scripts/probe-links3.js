const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');

const ftIdx = c.indexOf('function ft()');
// find module start - last occurrence of }(digits before ft
let modStart = 0;
const re = /\d+\(e,t,n\)\{/g;
let m;
while ((m = re.exec(c)) && m.index < ftIdx) modStart = m.index;

console.log('module starts at', modStart);
console.log(c.substring(modStart, modStart + 400));

// find exports / imports in module - look for n.d and n(
const modChunk = c.substring(modStart, ftIdx);
const deps = [...modChunk.matchAll(/n\((\d+)\)/g)].map((x) => x[1]);
console.log('deps:', [...new Set(deps)].slice(-15));

// search be assignment in full module to Wc
const fullMod = c.substring(modStart, c.indexOf('Wc=function') + 500);
const beAssign = [...fullMod.matchAll(/(\w+)=.{0,30}forwardRef/g)];
console.log('forwardRef assigns:', beAssign.map((x) => x[0]));

// What is rt in Wc - search rt= in module after ft
const afterFt = c.substring(ftIdx, c.indexOf('Wc=function'));
const rtInMod = afterFt.match(/(\w+)=function[^}]{0,80}Router/);
console.log('router assign:', rtInMod);

// List all short var = something before Wc in tail of bundle
const tail = c.substring(c.indexOf('var pt='), c.indexOf('Wc=function') + 200);
const exports = tail.match(/\b(rt|ge|de|ce|be|K)\b/g);
console.log('symbols in tail:', exports);
