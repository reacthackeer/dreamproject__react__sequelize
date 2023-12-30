const {DataTypes} = require('sequelize'); 
const sequelize = require('../config/database');
const OfferModel = require('./Offers');
const ProductModel = sequelize.define('product', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product__id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product__uid: {
        type: DataTypes.STRING, 
        unique: true
    },
    store__id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store__email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product__group: {
        type: DataTypes.STRING,
        defaultValue: 'a',
        allowNull: false,
    },
    filter_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visible__url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
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
    up: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total__sell: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total__review: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total__profit: {
        type: DataTypes.DECIMAL(20,4),
        defaultValue: 0,

    },
    total__view: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    way__quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
    },
    offer__quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rating__average: {
        type: DataTypes.DECIMAL(2,1),
        defaultValue: '5'
    },
    whole__price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false, 
    },
    current__price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false, 
    },
    previous__price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false, 
    },
    offer__price: {
        type: DataTypes.DECIMAL(20,2), 
        defaultValue: 0
    },
    profit: {
        type: DataTypes.DECIMAL(20,2), 
        allowNull: false
    },
    on__way: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'no'
    },
    offer__stock__out__salable: {
        type: DataTypes.STRING,
        defaultValue: 'no'
    },
    stock__out_salable: {
        type: DataTypes.STRING,
        defaultValue: 'no'
    },
    discountable: {
        type: DataTypes.STRING,
        defaultValue: 'no'
    },
    visible: {
        type: DataTypes.STRING,
        defaultValue: 'yes'
    },
    salable: {
        type: DataTypes.STRING,
        defaultValue: 'yes'
    },
    is__recycle: {
        type: DataTypes.STRING,
        defaultValue: 'no'
    },
    discount__coupons: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    images: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    overviews: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    details: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    specifications: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    price__history: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    editor__history: {
        type: DataTypes.JSON,
        defaultValue: `[]`
    },
    infos: {
        type: DataTypes.JSON,
        defaultValue: `{}`
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = ProductModel;                  