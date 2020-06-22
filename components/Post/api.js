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
        preHandler: [fastify.authenticate],
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
        handler: (request, reply) => controller(fastify, request, reply)
    });

    fastify.route({
        method: 'GET',
        url: '/post/:id',
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

    fastify.route({
        method: 'GET',
        url: '/posts/user',
        preHandler: [fastify.authenticate],
        schema: {
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: (request, reply) => controller.get_posts_for_user(fastify, request, reply)
    });

    fastify.route({
        method: 'GET',
        url: '/post/admission',
        preHandler: [fastify.authenticate, fastify.isAdmin],
        schema: {
            body: {
                id: { type: "number" },
                admission: { type: "boolean" },
                admission_comment: { type: "string" }
            },
            response: {
                200: {
                    type: 'object'
                }
            }
        },
        handler: (request, reply) => controller.admission(fastify, request, reply)
    });


    done();
};