const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');

// Define the Union model
const Union = sequelize.define('union', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    upazilla_id: {
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
    url: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
    createdAt: 'created_at', // Customize the created_at field name
    updatedAt: 'updated_at', // Customize the updated_at field name
});


module.exports = Union;