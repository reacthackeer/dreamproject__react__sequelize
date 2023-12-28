const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Cart model
const SellingHistory = sequelize.define('sellingHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product__id: {
        type: DataTypes.STRING,
    }, 
    price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false
    },
    user__id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', // Customize the updated_at field name
});

module.exports = SellingHistory;