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
        method: 'POST',
        url: '/user/register',
        schema: {
            body: {
                name: {
                    type: "string"
                },
                surname: {
                    type: "string"
                },
                patronymic: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                geolocation: {
                    type: "string"
                },
                birthday: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                email: {
                    type: "string"
                }
            },
            response: {
                200: {
                    type: 'object',
                    data: {
                        status: {type: 'string'},
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: (request, reply) => controller.register(fastify, request, reply)
    });

    done();
};