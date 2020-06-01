const { generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path');

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

if (!fs.existsSync(path.join(__dirname, "../certs"))) {
    fs.mkdir(path.join(__dirname, "../certs"), (err) => {
        if (err) throw err;
        console.log('certs folder has been added...');
    });
} else {
    console.log("certs folder already exists!");
}

console.log('private.pem generating...');
fs.writeFile(path.join(__dirname, "../certs/private.pem"), privateKey, (err) => {
    if (err) throw err;
    console.log('private.pem has been generated!');
});

console.log('public.pem generating...');
fs.writeFile(path.join(__dirname, "../certs/public.pem"), publicKey, (err) => {
    if (err) throw err;
    console.log('public.pem has been generated!');
});

console.log("done!");


