const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
let b = fs.readFileSync(bundlePath, 'utf8');

const oldHref = 'return a.startsWith("http")?a:r+a';
const newHref = 'return a.startsWith("http")?a:a.startsWith("/")?a:r+a';

const count = b.split(oldHref).length - 1;
if (count === 0) {
  console.error('createHref pattern not found');
  process.exit(1);
}

b = b.split(oldHref).join(newHref);
console.log('Fixed createHref:', count, 'occurrence(s)');

// Footer / in-page <a href="/..."> → React Router Link for SPA navigation
const footerReplacements = [
  ['(0,ut.jsx)("a",{href:"/",className:"hover:text-primary transition-colors",children:"Home"}', '(0,ut.jsx)(be,{to:"/",className:"hover:text-primary transition-colors",children:"Home"}'],
  ['(0,ut.jsx)("a",{href:"/products",className:"hover:text-primary transition-colors",children:"Products"}', '(0,ut.jsx)(be,{to:"/products",className:"hover:text-primary transition-colors",children:"Products"}'],
  ['(0,ut.jsx)("a",{href:"/faq",className:"hover:text-primary transition-colors",children:"FAQ"}', '(0,ut.jsx)(be,{to:"/faq",className:"hover:text-primary transition-colors",children:"FAQ"}'],
  ['(0,ut.jsx)("a",{href:"/contact",className:"hover:text-primary transition-colors",children:"Contact Us"}', '(0,ut.jsx)(be,{to:"/contact",className:"hover:text-primary transition-colors",children:"Contact Us"}'],
  ['(0,ut.jsx)("a",{href:"/contact",className:"hover:text-primary transition-colors",children:"Get Quote"}', '(0,ut.jsx)(be,{to:"/contact",className:"hover:text-primary transition-colors",children:"Get Quote"}'],
  ['(0,ut.jsx)("a",{href:"/specification",className:"hover:text-primary transition-colors",children:"Specifications"}', '(0,ut.jsx)(be,{to:"/specification",className:"hover:text-primary transition-colors",children:"Specifications"}'],
];

let footerOk = 0;
for (const [oldStr, newStr] of footerReplacements) {
  if (b.includes(oldStr)) {
    b = b.replace(oldStr, newStr);
    footerOk++;
  }
}
console.log('Footer links → Router Link:', footerOk);

// Category footer links
b = b.replace(
  /\(0,ut\.jsx\)\("a",\{href:"\/products\?category=([^"]+)",className:"hover:text-primary transition-colors"/g,
  '(0,ut.jsx)(be,{to:"/products?category=$1",className:"hover:text-primary transition-colors"'
);

fs.writeFileSync(bundlePath, b);
console.log('Done');
