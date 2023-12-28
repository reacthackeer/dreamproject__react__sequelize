const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Cart model
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    store__email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'empty' 
    },
    store__id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'empty' 
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '4'
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'user'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user__id: {
        type: DataTypes.STRING,
        unique: true,
    },
    is__active: {
        type: DataTypes.STRING, 
        allowNull: true, 
        defaultValue: 'true'
    },
    is__jail: {
        type: DataTypes.STRING, 
        allowNull: true, 
        defaultValue: 'false'
    },
    address: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: '[]'
    },
    img__src: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    balance: {
        type: DataTypes.DECIMAL(20,1),
        defaultValue: 0,
    },
    point: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', // Customize the updated_at field name
});

module.exports = User;