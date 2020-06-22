const { Post } = require('./model');
const { PostCategories } = require('../PostCategory/model');
const { Op } = require("sequelize");

async function create(fastify, request, reply) {

    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {

        const post = await Post.create({
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            UserId: request.user.UserId
        });

        request.body.categories.forEach(CategoryId => {
            PostCategories.create({
                PostId: post.id,
                CategoryId: CategoryId
            });
        });

        if (post) {
            result.status = "OK";
            result.message = "Запись успешно создана!";
        }

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);

}

async function get(fastify, request, reply) {

    let result;

    try {

        const post = await Post.findOne({
            where: {
                id: request.params.id
            }
            
        });

        if (post) {

            if (post.admission) {
                result = {
                    post: post
                };
            } else {
                if (post.UserId === request.user.UserId) {
                    result = {
                        post: post
                    };
                } else {
                    result = {
                        message: "Не найдено"
                    }
                }
            }


        }

    } catch (error) {
        fastify.rollbar.error(error);

        result = {
            status: "ERROR",
            message: "Not found",
            code: 404
        };
    }

    return JSON.stringify(result);

}

async function get_all(fastify, request, reply) {

    let result;

    try {

        const posts = await Post.findAll({
            where: {
                admission: true
            }
        });

        if (posts) {
            result = posts;
        }

    } catch (error) {
        fastify.rollbar.error(error);

        result = {
            status: "ERROR",
            message: "Not found",
            code: 404
        };
    }

    return JSON.stringify(result);

}

async function get_posts_for_user(fastify, request, reply) {

    let result;

    try {

        if (request.user.UserId === request.body.UserId) {
            const posts = await Post.findAll({
                where: {
                    UserId: request.body.UserId
                }
            });

            if (posts) {
                result = posts;
            }
        } else {
            result = {
                message: "Доступ ограничен"
            }
        }



    } catch (error) {
        fastify.rollbar.error(error);

        result = {
            status: "ERROR",
            message: "Not found",
            code: 404
        };
    }

    return JSON.stringify(result);

}

async function admission(fastify, request, reply) {

    let result;

    try {

        const post = await Post.findOne({
            where: {
                id: request.body.id
            }
        });

        if (post) {
            post.admission = request.body.admission;
            post.admission_comment = request.body.admission_comment;

            result.status = "OK";
            result.message = "Запись успешно одобрена"
        }

    } catch (error) {
        fastify.rollbar.error(error);

        result = {
            status: "ERROR",
            message: "Not found",
            code: 404
        };
    }

    return JSON.stringify(result);

}

module.exports = { create, get, get_all, admission, get_posts_for_user };