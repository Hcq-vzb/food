const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'bundle.js');
const outPath = path.join(__dirname, '..', 'sitemap.xml');
const base = 'https://foodingredientschina.com';
const today = new Date().toISOString().slice(0, 10);

const bundle = fs.readFileSync(bundlePath, 'utf8');
const productIds = [...bundle.matchAll(/\{id:"([a-z0-9-]+)",name:"/g)]
  .map((m) => m[1])
  .filter((id) => !['email', 'message', 'quantity', 'name', 'whatsapp'].includes(id));

const hcMatch = bundle.match(/var hc=\[([^\]]+)\]/);
const categories = hcMatch
  ? hcMatch[1]
      .split(',')
      .map((s) => s.replace(/^"|"$/g, ''))
      .filter((c) => c && c !== 'All')
  : [];

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/products', priority: '0.9', changefreq: 'weekly' },
  { loc: '/specification', priority: '0.8', changefreq: 'monthly' },
  { loc: '/faq', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
];

const urls = [
  ...staticPages.map((p) => ({ ...p, loc: `${base}${p.loc}` })),
  ...categories.map((c) => ({
    loc: `${base}/products?category=${encodeURIComponent(c)}`,
    priority: '0.75',
    changefreq: 'weekly',
  })),
  ...productIds.map((id) => ({
    loc: `${base}/products/${id}`,
    priority: '0.6',
    changefreq: 'monthly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(outPath, xml);
console.log(`Wrote ${urls.length} URLs to sitemap.xml (${productIds.length} products, ${categories.length} categories)`);
