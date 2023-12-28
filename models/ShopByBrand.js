const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the ShopByBrand model
const ShopByBrand = sequelize.define('shopByBrand', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', // Customize the updated_at field name
});

module.exports = ShopByBrand;