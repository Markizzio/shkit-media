const { Post } = require('./model');
const { PostCategories } = require('../PostCategories/model');
const { Category } = require('../Categories/model');
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

            const categoriesId = await PostCategories.findAll({
                where: {
                    PostId: post.id
                }
            });

            console.log(categoriesId)

            const categories = await Category.findAll({
                where: {
                    id: {
                        [Op.or]: categoriesId.map(value => value.CategoryId)
                    }
                }
            });

            result = {
                post: post,
                categories: categories
            };
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

        const posts = await Post.findAll();

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

module.exports = { create, get, get_all };