const controller = require('./controller');

module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'POST',
        url: '/user/auth',
        schema: {
            body: {
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                fingerprint: {
                    type: 'string'
                }
            },
            response: {
                200: {
                    type: 'object',
                    data: {
                        status: {type: 'string'},
                        token: {type: 'string'}
                    }
                }
            }
        },
        handler: (request, reply) => controller.auth(fastify, request, reply)
    });

    fastify.route({
        method: 'GET',
        url: '/user/test',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        hello: {type: 'string'}
                    }
                }
            }
        },
        handler: function (request, reply) {
            reply.send({hello: 'world'})
        }
    });

    done();
};