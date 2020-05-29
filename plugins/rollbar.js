'use strict';

const fp = require('fastify-plugin');
const Rollbar = require("rollbar");

function fastifyRollbar(instance, options, next) {

    if (!options.accessToken) {
        next(new Error('Missing access token'));
        return;
    }

    instance.rollbar = new Rollbar(options);

    next();

}

module.exports = fp(fastifyRollbar, {
    fastify: '^2.0.0',
    name: 'fastify-rollbar'
});