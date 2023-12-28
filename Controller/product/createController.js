const asyncHandler = require('express-async-handler');
const ProductModel = require('../../models/Product');

const handleAddSingleProduct = asyncHandler(async(req, res, next) => {
    let allPropertyStore = [
        'product__id',
        'product__uid',
        'store__id',
        'store__email',
        'product__group',
        'filter_url',
        'visible__url',
        'title',
        'brand',
        'child',
        'parent',
        'parent__father',
        'up',
        'message',
        'total__sell',
        'total__review',
        'total__profit',
        'total__view',
        'way__quantity',
        'quantity',
        'offer__quantity',
        'rating__average',
        'whole__price',
        'current__price',
        'previous__price',
        'offer__price',
        'profit',
        'on__way',
        'offer__stock__out__salable',
        'stock__out_salable',
        'discountable',
        'visible',
        'salable',
        'is__recycle',
        'discount__coupons',
        'images',
        'overviews',
        'details',
        'specifications',
        'price__history',
        'editor__history',
        'infos'
    ]
    let resultIndex = [];
    for(let property in req.body){
        let index = allPropertyStore.indexOf(property);
        if(index === -1){
            resultIndex.push(property);
        }
    } 
    
    if(resultIndex.length === 0){
        try {
            let result = await ProductModel.create(req.body);
            if(result && result.title){
                res.json(result.dataValues)
            }else{ 
                next(new Error("Internal server  error!"))
            }
        } catch (error) { 
            next(new Error(error.message))
        }
    }else{ 
        next(new Error('Invalid server requested!'));
    }
}); 

const handleAddMultipleProduct = asyncHandler(async(req, res, next) => {
    if(req.body.length){
        try {
            let result = await ProductModel.bulkCreate(req.body);
            if(result && result.length){ 
                res.json(result)
            }else{

                next(new Error("Internal server  error!"))
            }
        } catch (error) {
            console.log(error.message);
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server requested!'));
    }
}); 

module.exports = { 
    handleAddSingleProduct,  
    handleAddMultipleProduct,    
}