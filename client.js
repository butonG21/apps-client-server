const http = require('http');

// mendefinisikan opsi permintaan yang akan dikirim ke server. Opsi ini mencakup host, port, path, metode (POST), dan header yang mencakup "X-RANDOM" dan "Content-Type". //
function sendPostRequest(counter) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'POST',
        headers: {
            'X-RANDOM': generateRandomString(),
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, res => {
        console.log(`Response received, HTTP status code: ${res.statusCode}`);
    });

    //menulis body permintaan dengan mengubah objek { counter } menjadi string JSON menggunakan JSON.stringify() dan menuliskannya ke permintaan dengan req.write(). //
    const body = { counter };
    req.write(JSON.stringify(body));
    req.end();
}
// Fungsi generateRandomString() digunakan untuk menghasilkan string acak dengan panjang 8 karakter. String ini digunakan sebagai nilai "X-RANDOM" di header permintaan. //
function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

// Di dalam fungsi setInterval(), kita mengatur agar fungsi sendPostRequest() dipanggil setiap 1 menit. Dalam fungsi tersebut, kita menghasilkan angka acak sebagai nilai counter dan memanggil sendPostRequest() dengan nilai tersebut//
setInterval(() => {
    const counter = Math.floor(Math.random() * 100) + 1;
    sendPostRequest(counter)
}, 60000)