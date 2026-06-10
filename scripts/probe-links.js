const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');

const toPaths = [...c.matchAll(/to:"([^"]+)"/g)].map((m) => m[1]);
const hrefPaths = [...c.matchAll(/href:"([^"#][^"]*)"/g)].map((m) => m[1]);

console.log('to without leading /:', [...new Set(toPaths.filter((x) => !x.startsWith('/') && !x.includes(':')))]);

const badHrefs = [...new Set(hrefPaths.filter((x) => !x.startsWith('/') && !x.startsWith('mailto:') && !x.startsWith('tel:') && x !== '#'))];
console.log('href without leading /:', badHrefs.slice(0, 30));

// Check rt router - BrowserRouter
const i = c.indexOf('rt=');
console.log('\nrt=', c.substring(i, i + 300));

// Check ge=
const j = c.indexOf('ge=');
console.log('\nge=', c.substring(j, j + 300));
