const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Cart model
// Define the GrandFather model
const GrandFather = sequelize.define('grandFather', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        src: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        up: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: true, // Add createdAt and updatedAt fields
        createdAt: 'created_at', // Customize the created_at field name
        updatedAt: 'updated_at', // Customize the updated_at field name
});

module.exports = GrandFather;