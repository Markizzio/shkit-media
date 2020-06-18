const sequelize = require('../../db');
const {Model, DataTypes} = require('sequelize');

class Post extends Model {
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(600),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: 0,
                msg: "Просмотров не может быть меньше 0"
            }
        }
    },
    admission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    admission_comment: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
}, {
    sequelize,
    modelName: "Post"
});

module.exports = {Post};