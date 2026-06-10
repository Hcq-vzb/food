const fs = require('fs');
const c = fs.readFileSync('c:/food/bundle.js', 'utf8');

// Find app module - search backwards from var pt for module start
const ptIdx = c.indexOf('var pt=[');
console.log('before pt:', c.substring(ptIdx - 1500, ptIdx));

// Find all be,{to: in app and show href generation - look for Navigate or useNavigate
const idx = c.indexOf('Wc=function');
console.log('\nWc context before:', c.substring(idx - 800, idx));
