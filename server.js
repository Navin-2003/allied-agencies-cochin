const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    
    // Normalize URL path
    let safeUrl = req.url.split('?')[0]; // Strip query parameters
    let filePath = safeUrl === '/' ? '/index.html' : safeUrl;
    filePath = path.join(__dirname, filePath);
    
    // Prevent directory traversal attacks using relative path analysis
    const relativePath = path.relative(__dirname, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Forbidden');
        return;
    }

    // Blacklist access to sensitive backend and config files
    const baseName = path.basename(filePath).toLowerCase();
    const blacklistedFiles = ['server.js', 'package.json', 'package-lock.json', '.git', 'deploy.yml'];
    if (blacklistedFiles.some(file => baseName.includes(file)) || filePath.includes('/.github/')) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Access Denied');
        return;
    }
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.warn(`[404] File not found: ${filePath}`);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('File Not Found');
            } else {
                console.error(`[500] Read error on: ${filePath}`, err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Inject security headers
            res.writeHead(200, { 
                'Content-Type': contentType,
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'Content-Security-Policy': "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://images.unsplash.com https://upload.wikimedia.org https://texmo.com https://www.cripumps.com https://lubipumps.com https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; frame-src https://www.google.com; img-src 'self' data: https:;"
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`  Allied Agencies Cochin Web Dev Server Live!`);
    console.log(`  Local URL: http://localhost:${PORT}`);
    console.log(`  Press Ctrl+C to terminate the server`);
    console.log(`==================================================\n`);
});
