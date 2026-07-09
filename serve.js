const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || 'dist2';
const port = process.argv[3] || 3457;
const root = path.resolve(dir);

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  const filePath = path.join(root, url);
  if (!filePath.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  try {
    let stat = fs.statSync(filePath);
    let finalPath = filePath;
    if (stat.isDirectory()) {
      finalPath = path.join(filePath, 'index.html');
      fs.statSync(finalPath);
    }
    const data = fs.readFileSync(finalPath);
    const ext = path.extname(finalPath);
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'text/html',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  } catch (e) {
    try {
      const data = fs.readFileSync(path.join(root, '404.html'));
      res.writeHead(404, { 'Content-Type': 'text/html' }).end(data);
    } catch (e2) {
      res.writeHead(404).end('Not Found');
    }
  }
}).listen(port, () => {
  console.log('Serving ' + dir + ' at http://127.0.0.1:' + port);
});
