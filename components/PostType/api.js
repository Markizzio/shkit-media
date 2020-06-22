const controller = require('./controller');

module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'POST',
        url: '/post/type/create',
        preHandler: [fastify.authenticate, fastify.isAdmin],
        schema: {
            body: {
                title: "string" ,
                description: "string"
            },
            response: {
                200: {
                    type: 'object',
                    data: {
                        status: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: (request, reply) => controller.create(fastify, request, reply)
    });

    fastify.route({
        method: 'POST',
        url: '/post/type/edit/',
        preHandler: [fastify.authenticate, fastify.isAdmin],
        schema: {
            body: {
                id: "number",
                title: "string" ,
                description: "string"
            },
            response: {
                200: {
                    type: 'object',
                    data: {
                        status: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: (request, reply) => controller.edit(fastify, request, reply)
    });

    fastify.route({
        method: 'GET',
        url: '/post/type/:id',
        preHandler: [fastify.authenticate],
        schema: {
            params: {
                id: { type: "integer" }
            },
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: (request, reply) => controller.get(fastify, request, reply)
    });

    fastify.route({
        method: 'GET',
        url: '/post/types',
        preHandler: [fastify.authenticate],
        schema: {
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: (request, reply) => controller.get_all(fastify, request, reply)
    });

    fastify.route({
        method: 'POST',
        url: '/post/remove',
        preHandler: [fastify.authenticate, fastify.isAdmin],
        schema: {
            body: {
                id: { type: "number" }
            },
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: (request, reply) => controller.remove(fastify, request, reply)
    });


    done();
};