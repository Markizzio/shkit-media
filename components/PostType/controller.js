const { PostType } = require('./model');

async function create(fastify, request, reply) {
    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {

        const post = await PostType.create({
            title: request.body.title,
            description: request.body.description
        });

        if (post) {
            result.status = "OK";
            result.message = "Тип записи успешно создан!";
        }

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);
}

async function get_all(fastify, request, reply) {

    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {

        const posts = await PostType.findAll();

        if (posts) {
            result.posts = posts;
            result.status = "OK";
            result.message = "Список типов записей"
        }

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);

}

async function get(fastify, request, reply) {

    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {

        const posts = await PostType.findOne({
            where: {
                id: request.params.id
            }
        });

        if (posts) {
            result.posts = posts;
            result.status = "OK";
            result.message = ""
        }

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);

}

async function edit(fastify, request, reply) {
    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {

        const post = await PostType.findOne({
            where: {
                id: request.body.id
            }
        });

        if (post) {

            post.title = request.body.title;
            post.description = request.body.description;

            await post.save();

            result.status = "OK";
            result.message = "Тип записи успешно обновлен!";
        }

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);
}

async function remove(fastify, request, reply) {
    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {

        const post = await PostType.findOne({
            where: {
                id: request.body.id
            }
        });

        if (post) {

            await post.destroy();

            result.status = "OK";
            result.message = "Тип записи успешно удален!";
        }

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);
}

module.exports = { create, get, get_all, edit, remove };