const fs = require('fs'); //  untuk mengakses sistem file //
const http = require('http'); // untuk membuat server HTTP //

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''; // menginisialisasi variabel body yang akan digunakan untuk mengumpulkan data yang dikirimkan oleh client //
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { headers } = req;
      const timetamp = new Date.toISOString();
      const logEntry = `[${timetamp}] Succsess: ${req.method} ${req.url} ${body} ${JSON.stringify(headers)}]`;
    });
  }
});
