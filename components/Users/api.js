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