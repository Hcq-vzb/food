const b = require('fs').readFileSync(require('path').join(__dirname, '..', 'bundle.js'), 'utf8');
const i = b.indexOf('Contact Food Ingredients China | Get Wholesale Quote');
console.log('contact helmet found:', i > 0);
const j = b.indexOf('Get in touch for wholesale');
console.log('contact hero:', j > 0 ? b.substring(j - 200, j + 200) : 'not found');
const k = b.indexOf('$c=function');
console.log('\ncontact page:', b.substring(k, k + 2000));
