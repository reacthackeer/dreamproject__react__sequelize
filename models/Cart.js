const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Cart model
const Cart = sequelize.define('cart', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product__id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user__id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 1
    }, 
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', // Customize the updated_at field name
});

module.exports = Cart;