const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class PostType extends Model{
}

PostType.init({
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Post_Type"
});

module.exports = { PostType };