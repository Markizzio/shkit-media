const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class RolePermissions extends Model {

}

RolePermissions.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Role_Permissions"
});

module.exports = { RolePermissions };