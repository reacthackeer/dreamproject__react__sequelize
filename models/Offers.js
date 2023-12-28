const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Offers model
const Offer = sequelize.define('offer', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product__id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        img__src: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'true',
        },
    }, {
        timestamps: true, // Add createdAt and updatedAt fields
        createdAt: 'created_at', // Customize the created_at field name
        updatedAt: 'updated_at', // Customize the updated_at field name
    }
);

module.exports = Offer;