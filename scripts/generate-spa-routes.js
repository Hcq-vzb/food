const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Nested route folders must load assets from site root
indexHtml = indexHtml.replace('src="bundle.js"', 'src="/bundle.js"');

const bundle = fs.readFileSync(path.join(root, 'bundle.js'), 'utf8');
const productIds = [...bundle.matchAll(/\{id:"([a-z0-9-]+)",name:"/g)]
  .map((m) => m[1])
  .filter((id) => !['email', 'message', 'quantity', 'name', 'whatsapp'].includes(id));

const hubRoutes = ['products', 'specification', 'faq', 'contact'];
const routes = [...hubRoutes, ...productIds.map((id) => `products/${id}`)];

let written = 0;
for (const route of routes) {
  const dir = path.join(root, ...route.split('/'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
  written++;
}

// Disable Jekyll on GitHub Pages (required for paths like /products/*)
fs.writeFileSync(path.join(root, '.nojekyll'), '\n');

// Update root index.html bundle path too
const rootIndex = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (rootIndex.includes('src="bundle.js"')) {
  fs.writeFileSync(path.join(root, 'index.html'), rootIndex.replace('src="bundle.js"', 'src="/bundle.js"'));
}

console.log(`Generated ${written} SPA route index.html files (${hubRoutes.length} hubs + ${productIds.length} products)`);
