const controller = require('./controller');

module.exports = function (fastify, opts, done) {

    fastify.route({
        method: 'POST',
        url: '/post/create',
        preHandler: [fastify.authenticate],
        schema: {
            body: {
                title: "string" ,
                description: "string",
                content: "string",
                categories: "array"
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
        url: '/post/edit/',
        preHandler: [fastify.authenticate, fastify.isCurrentUser],
        schema: {
            body: {
                id: "number",
                title: "string" ,
                description: "string",
                content: "string",
                categories: "array"
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
        method: 'GET',
        url: '/post/:id',
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
        url: '/posts',
        schema: {
            response: {
                200: {
                    type: 'object'
                } 
            }
        },
        handler: (request, reply) => controller.get_all(fastify, request, reply)
    });


    done();
};