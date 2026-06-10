const fs = require('fs');
const b = fs.readFileSync('c:/food/bundle.js', 'utf8');
const i = b.indexOf('rel:"canonical",href:"All"');
console.log('products canonical:', b.substring(i, i + 280));
