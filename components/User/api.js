const controller = require('./controller');

module.exports = function (fastify, opts, done) {

    // fastify.route({
    //     method: 'GET',
    //     url: '/user/test',
    //     handler: (request, reply) => {
    //         console.log(request)
    //         reply.send(request.raw.originalUrl);
    //     }
    // });

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
                    type: 'object'
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

    fastify.route({
        method: "GET",
        url: "/user/:id",
        preHandler: [fastify.authenticate],
        schema: {
            params: {
                id: {type: "integer"}
            },
            response: {
                200: {
                    type: "object",
                    data: {
                        user: {type: "object"},
                        status: {type: "string"}
                    }
                },
                404: {
                    type: "object",
                    data: {
                        status: {type: "string"},
                        message: {type: "string"}
                    }
                }
            }
        },
        handler: (request, reply) => controller.get(fastify, request, reply)
    });

    fastify.route({
        method: "POST",
        url: "/user/edit",
        preHandler: [fastify.authenticate],
        schema: {
            body: {
                id: {type: "integer"},
                name: {type: "string"},
                surname: {type: "string"},
                patronymic: {type: "string"},
                email: {type: "string"},
                phone: {type: "phone"},
                birthday: {type: "string"},
            },
            response: {
                200: {
                    type: "object"
                },
                404: {
                    type: "object",
                    data: {
                        status: {type: "string"},
                        message: {type: "string"}
                    }
                }
            }
        },
        handler: (request, reply) => controller.edit(fastify, request, reply)
    });

    done();
};