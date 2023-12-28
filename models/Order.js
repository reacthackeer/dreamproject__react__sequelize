const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Orders model
const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product__id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user__id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pay__type: {
        type: DataTypes.STRING,
    },
    order__id: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL(20,2),
    },
    id_order__id: {
        type: DataTypes.STRING,
    },
    reason: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', 
});


module.exports = Order;