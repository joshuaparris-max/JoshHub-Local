import { apps } from './src/data/apps';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

async function checkUrl(url: string): Promise<boolean> {
  if (url.startsWith('/')) {
    // Local path: check if it exists in public/
    // Handle things like /games/buckland-v2/index.html -> public/games/buckland-v2/index.html
    const localPath = path.join(process.cwd(), 'public', url.split('?')[0]);
    if (fs.existsSync(localPath)) return true;
    
    // Some routes might be Next.js routes (e.g., /, /dashboard)
    const routes = ['/', '/dashboard', '/apps', '/games', '/projects'];
    if (routes.includes(url)) return true;

    return false;
  }
  
  if (url.startsWith('file:')) {
    const localPath = url.replace('file:///', 'C:/').replace(/\//g, '\\\\');
    return fs.existsSync(localPath);
  }

  // External URL
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      // 2xx, 3xx, and even 403 (for some bot protections) are usually "working" enough to mean the site exists
      if (res.statusCode && (res.statusCode < 400 || res.statusCode === 403)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

async function main() {
  const allLinks = new Set<string>();
  
  apps.forEach(app => {
    if (app.primaryUrl) allLinks.add(app.primaryUrl);
    app.urls?.forEach(u => allLinks.add(u.url));
  });

  const links = Array.from(allLinks).filter(url => url.length > 0);
  console.log(`Checking ${links.length} unique links...`);

  const results = [];
  let index = 0;
  
  // Process in batches
  const batchSize = 10;
  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    const checks = await Promise.all(batch.map(async url => {
      const ok = await checkUrl(url);
      return { url, ok };
    }));
    results.push(...checks);
    index += batchSize;
    process.stdout.write(`\rProgress: ${Math.min(index, links.length)} / ${links.length}`);
  }
  
  console.log('\n\nFailed links:');
  const failed = results.filter(r => !r.ok);
  failed.forEach(f => console.log(`- ${f.url}`));
  
  if (failed.length === 0) {
    console.log('All links are working!');
  } else {
    console.log(`\nFound ${failed.length} broken links.`);
  }
}

main();
