const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const User = require('./model');


/**
 * Метод авторизации пользователя и выдачи ему токена
 * @param fastify - глобальный объект fastify
 * @param request - объект запроса
 * @param reply - объект ответа
 * @returns {Promise<void>} - токен или сообщение о неудаче
 */
async function auth(fastify, request, reply) {

    const res = {};

}

module.exports = { auth };