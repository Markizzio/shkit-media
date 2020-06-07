const sequelize = require('../../db');
const { Model, DataTypes } = require('sequelize');

class AttachmentType extends Model{
}

AttachmentType.init({
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
        type: DataTypes.STRING,
        allowNull: false
    },
    mime_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Attachment_Type"
});

module.exports = { AttachmentType };