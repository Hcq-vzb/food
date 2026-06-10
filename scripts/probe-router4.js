const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');
const idx = c.indexOf('createRoot');
const last = c.lastIndexOf('createRoot');
console.log('first createRoot app mount:', c.substring(last - 100, last + 400));

const ridx = c.indexOf('function ft()');
console.log('\nheader component ft:', c.substring(ridx, ridx + 800));
