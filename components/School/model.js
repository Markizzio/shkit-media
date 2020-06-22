const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class School extends Model{
}

School.init({
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
    logo_src: {
        type: DataTypes.STRING,
        allowNull: false
    },
    header_src: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admission: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    admission_comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "School"
});

module.exports = { School };