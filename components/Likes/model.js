const sequelize = require('../../db');
const {Model, DataTypes} = require('sequelize');

class Like extends Model{
}

Like.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Like"
});

module.exports = { Like };