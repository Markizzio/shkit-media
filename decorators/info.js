module.exports = function (fastify, opts, done) {

    fastify.decorate('info_log', (info) => {
        fastify.rollbar.info(info);
    });

    done();

};