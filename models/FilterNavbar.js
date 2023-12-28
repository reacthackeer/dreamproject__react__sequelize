const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Cart model
const FilterNavbar = sequelize.define('filterNavbar', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        child: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parent__father: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: '[]'
        },
        up: {
            type: DataTypes.STRING,
            allowNull: 'false'
        },
    }, {
        timestamps: true, // Add createdAt and updatedAt fields
        createdAt: 'created_at', // Customize the created_at field name
        updatedAt: 'updated_at', // Customize the updated_at field name
});


module.exports = FilterNavbar;