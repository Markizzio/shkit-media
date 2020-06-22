const sequelize = require('../../db');
const {Model, DataTypes} = require('sequelize');

class Role extends Model{
}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Role"
});

module.exports = { Role };