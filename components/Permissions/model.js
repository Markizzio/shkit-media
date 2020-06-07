const sequelize = require('../../db');
const {Model, DataTypes} = require('sequelize');

class Permission extends Model{
}

Permission.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(600),
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Permission"
});

module.exports = { Permission };