const { execSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
process.chdir(root);

console.log('1/2 generate-sitemap.js');
execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });

console.log('2/2 generate-spa-routes.js');
execSync('node scripts/generate-spa-routes.js', { stdio: 'inherit' });

console.log('\nDeploy-ready: push to GitHub Pages, then re-submit sitemap in Search Console.');
