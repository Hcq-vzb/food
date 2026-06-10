const fs = require('fs');
const b = fs.readFileSync('c:/food/bundle.js', 'utf8');
let idx = 0;
let n = 0;
while ((idx = b.indexOf('"h1"', idx)) >= 0 && n < 15) {
  console.log('---', n, '---');
  console.log(b.substring(idx - 80, idx + 120));
  idx += 4;
  n++;
}
