const fp = require("fastify-plugin");
const fs = require('fs');
const path = require('path');

module.exports = fp(async function(fastify, opts) {

    const certs = fs.readdirSync(path.join(__dirname, "../certs"));

    if (certs.length === 0) {
        console.log(new Error("No certs in certs directory"));
        process.exit(1);
    }

    fastify.register(require("fastify-jwt"), {
        secret: {
            private: fs.readFileSync(`${path.join(__dirname, '../certs')}/private.pem`, 'utf8'),
            public: fs.readFileSync(`${path.join(__dirname, '../certs')}/public.pem`, 'utf8')
        },
        sign: { algorithm: 'RS256' }
    });

    fastify.decorate("authenticate", async function(request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    });

});