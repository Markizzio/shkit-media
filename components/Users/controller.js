const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const { User } = require('./model');
const { Role } = require('../Roles/model');

/**
 * Метод авторизации пользователя и выдачи ему токена
 * @param fastify - глобальный объект fastify
 * @param request - объект запроса
 * @param reply - объект ответа
 * @returns {Promise<string>} - токен или сообщение о неудаче
 */
async function auth(fastify, request, reply) {

    const result = {
        status: "ERROR"
    };

    try {
        const user = await User.findOne({
            where: {
                email: request.body.email
            }
        });

        if (user) {
            const compare = bcrypt.compareSync(request.body.password, user.password);

            if (compare) {
                result.status = "OK";
                result.token = fastify.jwt.sign({
                    UserId: user.id,
                    RoleId: user.RoleId
                });
            }
        } else {
            result.message = "Неверная почта или пароль!";
        }
    

    } catch (error) {
        fastify.rollbar.error(error);
    }

    return JSON.stringify(result);

}

async function register(fastify, request, reply) {

    const result = {
        status: "ERROR",
        message: "Возникла ошибка!"
    };

    try {
        const role = await Role.findOne({
            where: {
                name: "user"
            }
        });

        const user = await User.create({
            name: request.body.name,
            surname: request.body.surname,
            patronymic: request.body.patronymic,
            password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10)),
            geolocation: "",
            birthday: request.body.birthday,
            phone: request.body.phone,
            email: request.body.email,
            RoleId: role.id
        });

        if (user) {
            result.status = "OK";
            result.message = "Вы успешно зарешистрированы!";
        }

    } catch (error) {
        result.message = error.errors[0].message;
    }

    return JSON.stringify(result);

}

async function get(fastify, request, reply) {

    const result = {
        status: "ERROR"
    };

    try {

        const user = await User.findOne({
            where: {
                id: request.params.id
            },
            attributes: ['id', 'name', 'surname', 'patronymic', 'email', 'phone', 'birthday']
        });

        if (user) {
            result.status = "OK";
            result.user = user;
        } else {
            reply.code(404);
            return {
                status: "ERROR",
                message: "Not found"
            };
        }

    } catch (error) {
        result.message = error.errors[0].message;
    }

    return JSON.stringify(result);

}

/**
 * TODO: редактирование жанных пользователя
 * @param fastify
 * @param request
 * @param reply
 * @returns {Promise<string|{message: string, status: string}>}
 */

async function edit(fastify, request, reply) {

    const result = {
        status: "ERROR"
    };

    if (request.user.UserId === request.body.id) {
        try {

            const user = await User.findOne({
                where: {
                    id: request.body.id
                },
                attributes: ['name', 'surname', 'patronymic', 'email', 'phone', 'birthday']
            });



            if (user) {


            } else {
                reply.code(404);
                return {
                    status: "ERROR",
                    message: "Not found"
                };
            }

        } catch (error) {
            result.message = error.errors[0].message;
        }
    }



    return JSON.stringify(result);

}

module.exports = { auth, register, get };