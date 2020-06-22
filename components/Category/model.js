const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class Category extends Model {}

Category.init({
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
    }
}, {
    sequelize,
    modelName: "Category"
});

module.exports = { Category };