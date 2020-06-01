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

fs.writeFileSync(path.join(__dirname, "../certs/private.pem"), privateKey);
fs.writeFileSync(path.join(__dirname, "../certs/public.pem"), publicKey);


