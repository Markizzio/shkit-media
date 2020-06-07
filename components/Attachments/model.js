const sequelize = require('../../db');
const {Model, DataTypes} = require('sequelize');

class Attachment extends Model{
}

Attachment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Attachment"
});

module.exports = { Attachment };