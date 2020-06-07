const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class PostCategories extends Model {
}

PostCategories.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Post_Categories"
});

module.exports = { PostCategories };