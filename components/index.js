const fp = require("fastify-plugin");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('../db');

const { User } = require('./Users/model');
const { Role } = require('./Roles/model');
const { Attachment } = require('./Attachments/model');
const { AttachmentType } = require('./AttachmentTypes/model');
const { Category } = require('./Categories/model');
const { Post } = require('./Posts/model');
const { PostCategories } = require('./PostCategories/model');
const { Permission } = require('./Permissions/model');
const { Like } = require('./Likes/model');
const { RolePermissions } = require('./RolePermissions/model');

User.hasMany(Post);
User.belongsTo(Role);
Post.belongsToMany(Category, {
    through: PostCategories
});
Category.belongsToMany(Post, {
    through: PostCategories
});
Role.belongsToMany(Permission, {through: RolePermissions});
Permission.belongsToMany(Role, {through: RolePermissions});
Post.hasMany(Attachment);
Like.belongsTo(User);
Like.belongsTo(Post);
Attachment.belongsTo(AttachmentType);

sequelize.sync({force:true}).then(()=>{
    console.log("Tables have been created");

    Role.create({
        name: "admin"
    });
    Role.create({
        name: "user"
    });
    User.create({
        name: "Иван",
        surname: "Иванов",
        patronymic: "Иванович",
        password: bcrypt.hashSync("qweqwe123", bcrypt.genSaltSync(10)),
        geolocation: "test",
        birthday: "1998-11-03",
        phone: "1111111",
        email: "admin@admin.admin",
        "RoleId": 1
    });
    Category.create({
        title: "Новости",
        description: "Новости"
    });
}).catch(err=>console.log(err));

module.exports = fp(async function(fastify, opts) {

    fastify.decorate("isPermitted", async (request, reply) => {
        let is_permitted = false;

        const role = Role.findOne({
            where: {
                id: request.user.RoleId
            }
        });

        if (request.user.RoleId === role.id) {
            is_admin = true;
        }

        return is_admin;
    });

    const components = fs.readdirSync(path.join(__dirname));
    components.forEach(component => {
        if (fs.lstatSync(path.join(__dirname, `${component}`)).isDirectory()) {
            const dir = fs.readdirSync(path.join(__dirname, `${component}`));
            if (dir.includes('api.js')) {
                fastify.register(require(path.join(__dirname, `${component}/api.js`)), { prefix: '/api' })
            }
        }
    });


});