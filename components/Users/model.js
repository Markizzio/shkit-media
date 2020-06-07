const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
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
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patronymic: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    geolocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isAfter: {
                args: "1900-01-01",
                msg: "Дата рождения не может быть ранее 1900-01-01"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Пользователь с таким email уже существует!"
        },
        validate: {
            isEmail: {
                args: true,
                msg: "Не правильный формат электронной почты!"
            }
        }
    }
}, {
    sequelize,
    modelName: "User"
});

module.exports = { User };