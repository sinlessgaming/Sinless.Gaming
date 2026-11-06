// node harness/shoot.mjs <dir> <tier> <outdir> <scenes.json>
import http from 'http'; import fs from 'fs'; import path from 'path'; import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const [, , DIR, tier, out, sj] = process.argv; const scenes = JSON.parse(fs.readFileSync(sj)); fs.mkdirSync(out, { recursive: true });
const root = path.resolve('.'), MIME = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.wasm': 'application/wasm', '.html': 'text/html' };
const srv = http.createServer((q, r) => { let u = decodeURIComponent(q.url.split('?')[0]); let f = u === '/' ? path.join(root, 'harness/page.html') : u.startsWith('/three/') ? path.join(root, 'node_modules', u) : path.join(root, u);
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(0);
const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const W = +(process.env.W || 1280), H = +(process.env.H || 720);
const pg = await br.newPage({ viewport: { width: W, height: H } }); const errs = []; pg.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); }); pg.on('pageerror', e => errs.push(String(e)));
await pg.goto(`http://localhost:${srv.address().port}/?dir=${DIR}&tier=${tier}&w=${W}&h=${H}`); await pg.waitForFunction(() => window.ready, null, { timeout: 240000 });
for (const S of scenes) { const d = await pg.evaluate((S) => window.shot(S), S); await pg.locator('#c').screenshot({ path: path.join(out, S.name + '.png'), timeout: 240000 }); console.log(S.name, JSON.stringify(d).slice(0, 300)); }
console.log('errors:', errs.slice(0, 8)); await br.close(); srv.close();
