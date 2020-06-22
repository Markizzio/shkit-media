const fp = require("fastify-plugin");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('../db');

const { User } = require('./User/model');
const { Role } = require('./Role/model');
const { Attachment } = require('./Attachment/model');
const { AttachmentType } = require('./AttachmentType/model');
const { Category } = require('./Category/model');
const { Post } = require('./Post/model');
const { PostCategories } = require('./PostCategory/model');
const { PostType } = require('./PostType/model');
const { Permission } = require('./Permission/model');
const { School } = require('./School/model');
const { SchoolInfo } = require('./SchoolInfo/model');
const { Like } = require('./Like/model');
const { RolePermissions } = require('./RolePermission/model');

User.hasMany(Post);
User.belongsTo(Role);
Category.belongsToMany(Post, {
    through: PostCategories
});
Post.belongsToMany(Category, {
    through: PostCategories
});
Post.hasMany(Attachment);
Post.belongsTo(PostType);
Role.belongsToMany(Permission, {through: RolePermissions});
Permission.belongsToMany(Role, {through: RolePermissions});
Like.belongsTo(User);
Like.belongsTo(Post);
Attachment.belongsTo(AttachmentType);
School.hasOne(SchoolInfo);
SchoolInfo.belongsTo(User, {
    as: "director"
});
User.belongsTo(School);

sequelize.sync({force:process.env.DB_FORCE || false}).then(()=>{
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

    fastify.decorate("isAdmin", async (request, reply) => {
        let is_admin = false;

        const role = Role.findOne({
            where: {
                name: "admin"
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