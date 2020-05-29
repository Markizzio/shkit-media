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

const components = fs.readdirSync(path.join(__dirname, 'components'));
components.forEach(component => {
    const dir = fs.readdirSync(path.join(__dirname, `components/${component}`));
    if (dir.includes('api.js')) {
        fastify.register(require(`./components/${component}/api.js`), { prefix: '/api' })
    }
});

const decorators = fs.readdirSync(path.join(__dirname, 'decorators'));
decorators.forEach(decorator => {
    fastify.register(require(`./decorators/${decorator}`))
});


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
