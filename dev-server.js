#!/usr/bin/env node
// Local dev server for maleniti.com — zero dependencies (Node builtins only),
// matching the rest of this project (no build step, no npm packages).
//
// What it does:
//   - Serves this directory as static files, with "/" mapped to
//     "Male Niti.html" (the deploy target — see CLAUDE.md > Deployment).
//   - Serves /api/* two ways, so you can develop the frontend before the
//     real API exists and swap it in once it does:
//       * default: an in-process mock implementing api-spec.yaml, backed by
//         the *actual* DEFAULT_SERVICES/DEFAULT_PRICING/DEFAULT_BLOG/
//         DEFAULT_WORK/DEFAULT_IMPRINT data from hi-fi/content.jsx (loaded
//         via vm, so the mock can't drift from the frontend's own fallback
//         data). /feed.xml is not mocked — it's a backend-generated RSS
//         feed with no frontend fallback data to source it from.
//       * if MALE_NITI_API_PROXY (or --proxy) is set, every /api/* request
//         is instead forwarded to that base URL — point it at your real API
//         dev server once it's running.
//
// Usage:
//   node dev-server.js [port]                       # mock API (default)
//   node dev-server.js [port] --proxy http://localhost:4000
//   PORT=3000 MALE_NITI_API_PROXY=http://localhost:4000 node dev-server.js

'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { URL } = require('url');

const ROOT = __dirname;

const args = process.argv.slice(2);
const proxyFlagIdx = args.indexOf('--proxy');
const PROXY_BASE = (proxyFlagIdx !== -1 ? args[proxyFlagIdx + 1] : null)
  || process.env.MALE_NITI_API_PROXY
  || null;
const portArg = args.find((a) => /^\d+$/.test(a));
const PORT = Number(portArg || process.env.PORT || 8080);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

// ── Mock API, sourced from hi-fi/content.jsx's own fallback data ───────────
// content.jsx only *defines* functions that touch `window`/`fetch`/React at
// module scope — it never calls them — so it can be evaluated headlessly
// with a stub `window` to pull out DEFAULT_SERVICES etc. without needing a
// browser or React. This keeps the mock from silently drifting out of sync
// with the frontend's real fallback data (see CLAUDE.md: they're required
// to mirror each other).
function loadDefaults() {
  const src = fs.readFileSync(path.join(ROOT, 'hi-fi', 'content.jsx'), 'utf8');
  const sandboxWindow = {};
  vm.runInNewContext(src, { window: sandboxWindow, fetch: () => {}, console }, { filename: 'hi-fi/content.jsx' });
  return {
    services: sandboxWindow.DEFAULT_SERVICES,
    pricing: sandboxWindow.DEFAULT_PRICING,
    blog: sandboxWindow.DEFAULT_BLOG,
    work: sandboxWindow.DEFAULT_WORK,
    imprint: sandboxWindow.DEFAULT_IMPRINT,
  };
}

function sendJson(res, status, body) {
  const buf = Buffer.from(JSON.stringify(body), 'utf8');
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': buf.length });
  res.end(buf);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function handleMockApi(req, res, pathname) {
  const defaults = loadDefaults(); // re-read on every request: edit content.jsx, refresh browser, see it live

  if (req.method === 'GET' && pathname === '/api/services') return sendJson(res, 200, defaults.services);
  if (req.method === 'GET' && pathname === '/api/pricing') return sendJson(res, 200, defaults.pricing);
  if (req.method === 'GET' && pathname === '/api/work') return sendJson(res, 200, defaults.work);
  if (req.method === 'GET' && pathname === '/api/blog') return sendJson(res, 200, defaults.blog);
  if (req.method === 'GET' && pathname === '/api/imprint') return sendJson(res, 200, defaults.imprint);

  const blogMatch = pathname.match(/^\/api\/blog\/([^/]+)$/);
  if (req.method === 'GET' && blogMatch) {
    const post = defaults.blog.find((p) => p.slug === decodeURIComponent(blogMatch[1]));
    if (!post) return sendJson(res, 404, { error: 'not found' });
    return sendJson(res, 200, post);
  }

  if (req.method === 'POST' && pathname === '/api/contact') {
    let payload;
    try { payload = JSON.parse(await readBody(req)); } catch (e) { return sendJson(res, 400, { error: 'invalid JSON' }); }
    const missing = ['name', 'email', 'msg'].filter((k) => !payload || !payload[k]);
    if (missing.length) return sendJson(res, 400, { error: 'missing: ' + missing.join(', ') });
    console.log('[mock /api/contact] submission:', payload);
    return sendJson(res, 201, { id: 'mock-' + Date.now(), received_at: new Date().toISOString() });
  }

  return sendJson(res, 404, { error: 'no mock handler for ' + req.method + ' ' + pathname });
}

function proxyApi(req, res, pathname, search) {
  // The real API's own routes are mounted at root (/services, not
  // /api/services - see its api-spec.yaml `servers` entries), so strip the
  // /api prefix this server itself matched on before forwarding upstream.
  const upstreamPath = pathname.replace(/^\/api/, '') || '/';
  const target = new URL(upstreamPath + search, PROXY_BASE);
  const lib = target.protocol === 'https:' ? https : http;
  const upstream = lib.request(target, { method: req.method, headers: { ...req.headers, host: target.host } }, (upRes) => {
    res.writeHead(upRes.statusCode, upRes.headers);
    upRes.pipe(res);
  });
  upstream.on('error', (err) => sendJson(res, 502, { error: 'proxy error: ' + err.message }));
  req.pipe(upstream);
}

// ── Static files ─────────────────────────────────────────────────────────
// MALE_NITI_PRODUCTION gates this repo's other files (the root wireframe
// canvas - index.html, design-canvas.jsx, app.jsx, variant-*.jsx, shared.jsx
// - plus scraps/uploads/docs) from being served at all. It's off by default
// so `node dev-server.js` still serves the whole repo for local wireframe
// work per CLAUDE.md; the Docker image sets it, since that image's only
// purpose is running the real deploy target, and CLAUDE.md > Deployment is
// explicit that only Male Niti.html, hi-fi/, and api-spec.yaml ship.
const PRODUCTION = process.env.MALE_NITI_PRODUCTION === '1';

function isShippable(rel) {
  return rel === '/Male Niti.html'
    || rel === '/blog.html'
    || rel === '/blog-post.html'
    || rel === '/impressum.html'
    || rel === '/privatnost.html'
    || rel === '/tweaks-panel.jsx'
    || rel === '/api-spec.yaml'
    || rel.startsWith('/hi-fi/');
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/') rel = '/Male Niti.html'; // deploy target, per CLAUDE.md
  if (PRODUCTION && !isShippable(rel)) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found: ' + rel); }
  const filePath = path.normalize(path.join(ROOT, rel));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found: ' + rel); }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const { pathname, search } = new URL(req.url, 'http://localhost');
  console.log(req.method, pathname);

  if (pathname.startsWith('/api/')) {
    if (PROXY_BASE) return proxyApi(req, res, pathname, search);
    try { return await handleMockApi(req, res, pathname); }
    catch (err) { return sendJson(res, 500, { error: err.message }); }
  }
  return serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`Male Niti dev server: http://localhost:${PORT}/`);
  console.log(PROXY_BASE
    ? `/api/* proxied to ${PROXY_BASE}`
    : `/api/* served by built-in mock (from hi-fi/content.jsx defaults) — pass --proxy <url> once your real API is running`);
});
