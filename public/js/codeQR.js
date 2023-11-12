const QRCode = require('qrcode');

function generateQRCode(data) {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(data, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        });
    });
}

