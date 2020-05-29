module.exports = function (fastify, opts, done) {

    fastify.decorate('error_log', (error) => {
        fastify.rollbar.error(error);
    });

    done();

};