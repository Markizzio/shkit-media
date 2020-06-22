const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class SchoolInfo extends Model{
}

SchoolInfo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    logo_src: {
        type: DataTypes.STRING,
        allowNull: false
    },
    header_src: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "School_Info"
});

module.exports = { SchoolInfo };