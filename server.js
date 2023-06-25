/* eslint-disable max-len */
const fs = require('fs'); //  untuk mengakses sistem file //
const http = require('http'); // untuk membuat server HTTP //

const server = http.createServer((req, res) => {
// memeriksa apakah metode permintaan adalah POST //
  if (req.method === 'POST') {
    // menginisialisasi variabel body yang akan digunakan untuk menampung data yang dikirimkan oleh client //
    let body = '';
    // mendaftarkan event 'data' untuk membaca data yang dikirimkan oleh client. Setiap kali ada potongan data yang diterima, potongan tersebut diubah menjadi string dan ditambahkan ke variabel body //
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    // Setelah semua data diterima (req.on('end')), kita mendapatkan header permintaan menggunakan req.headers dan waktu saat ini menggunakan new Date().toISOString(). //
    req.on('end', () => {
      const { headers } = req;
      const timetamp = new Date().toISOString();
      // membuat entri log dengan menggabungkan waktu, jenis permintaan, URL, body, dan header //
      const logEntry = `[${timetamp}] Succsess: ${req.method} ${req.url} ${body} ${JSON.stringify(headers)}\n`;
      // membuat log file menggunkan  fs.appendFile() untuk menampung data dari `logEntry` //
      fs.appendFile('server.log', logEntry, (err) => {
        if (err) {
          console.error('Failed to write to server.log:', err);
        }
      });
      res.statusCode = 201;
      res.end();
    });
  } else {
    res.statusCode = 201;
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
