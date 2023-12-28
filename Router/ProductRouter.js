const { 
    handleAddSingleProduct, 
    handleAddMultipleProduct 
} = require('../Controller/product/createController'); 
const { 
    handleGetAllSearchProduct, handleGetAllSingleBrandProduct, handleGetAllProduct, handleGetAllSingleBrandSimilarProduct 
} = require('../Controller/product/readController');

const productRouter = require('express').Router();

productRouter.post('/', handleAddSingleProduct);
productRouter.post('/multiple', handleAddMultipleProduct);
productRouter.get('/search/:search_string', handleGetAllSearchProduct);
productRouter.get('/brands/:brand', handleGetAllSingleBrandProduct);
productRouter.get('/getAllProduct', handleGetAllProduct);
productRouter.get('/brands/:brand/:product__id', handleGetAllSingleBrandSimilarProduct);


module.exports = productRouter;