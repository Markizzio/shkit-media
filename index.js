const fastify = require('fastify')({
    logger: true
});
require('dotenv').config();
const fs = require('fs');
const path = require('path');

fastify.register(require('./plugins/rollbar'), {
    accessToken: process.env.RB_ACCESS_TOKEN,
    captureUncaught: process.env.RB_CAPTURE_UNCAUGHT,
    captureUnhandledRejections: process.env.RB_CAPTURE_UNHANDLED_REJECTIONS
});
fastify.register(require('fastify-cors'), {
    origin: "*"
});
fastify.register(require('./plugins/jwt'));
fastify.register(require('fastify-helmet'));
fastify.register(require('./components/index'));

fastify.addHook('onRequest', async (request, reply) => {
    fastify.rollbar.info(request);
});

fastify.addHook('onError', async (request, reply, error) => {
    fastify.rollbar.error(error);
});

const start = async () => {
    try {
        await fastify.listen(process.env.APP_PORT || 3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start().then(r => fastify.rollbar.log(r));
