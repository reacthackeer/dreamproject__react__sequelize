const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Cart model
const District = sequelize.define('district', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    division_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bn_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lat: {
        type: DataTypes.STRING,
    },
    lon: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', // Customize the updated_at field name
});

module.exports = District;