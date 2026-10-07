// Publishes the draft patch-note entry: node release.js
// Takes the draft off the entry marked `draft: true`, dates it today, makes its version the site's, and bumps the
// cache stamp on site.js and style.css in index.html. Commit and push afterwards.
const fs = require('fs');
let site = fs.readFileSync('site.js', 'utf8');
const draft = site.match(/\{ draft: true, date: '[^']*', title: 'Version ([\d.]+)'/);
if (!draft) {
	console.log('No draft entry in site.js.');
	process.exit(1);
}
const version = draft[1];
const today = new Date().toISOString().slice(0, 10);
site = site.replace(/\t\t\/\/ draft: true:[^\n]*\n/, '')
	.replace(draft[0], `{ date: '${today}', title: 'Version ${version}'`)
	.replace(/version: '[\d.]+',/, `version: '${version}',`);
fs.writeFileSync('site.js', site);
const stamp = Date.now().toString(36);
fs.writeFileSync('index.html', fs.readFileSync('index.html', 'utf8').replace(/\?v=[a-z0-9]+/g, `?v=${stamp}`));
console.log(`Released ${version} (${today}). Commit, then git push.`);
