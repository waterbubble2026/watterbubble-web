const http = require('http');

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
let body = '--' + boundary + '\r\n';
body += 'Content-Disposition: form-data; name="image"; filename="test.png"\r\n';
body += 'Content-Type: image/png\r\n\r\n';
body += 'fake-image-content\r\n';
body += '--' + boundary + '--\r\n';

const req = http.request({
  hostname: 'localhost',
  port: 5173,
  path: '/api/subcategories/6abe994b59df25a4311cdb10/images',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': Buffer.byteLength(body)
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', data));
});
req.on('error', e => console.error('Error:', e));
req.write(body);
req.end();
