const asyncHandler = require('express-async-handler');
const OfferModel = require('../../models/Offers');

const handleAddSingleOffer = asyncHandler(async(req, res, next)=>{
    let {name, product__id, img__src, active} = req.body;
    if( name && product__id && img__src && active){
        let postData = {name, product__id, img__src, active};
        try {
            let createResult = await OfferModel.create(postData);
            if(createResult && createResult.dataValues.name){
                res.json({message: 'Successfully offer created!', status__code: 201, result:createResult.dataValues});
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) {
            next(new Error(error.message));
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});
const handleAddMultipleOffer = asyncHandler(async(req, res, next)=>{
    let offerArray = req.body;
    if(offerArray.length){
        
        try {
            let createResult = await OfferModel.bulkCreate(offerArray);
            if(createResult && createResult.length){
                let allOffers = [];
                createResult.map((info)=>{
                    allOffers.push(info.dataValues);
                })
                res.json({message: 'Successfully offers created!', status__code: 201, result: allOffers});
            }else{
                next(new Error('Internal server error!'))
            }
        } catch (error) {
            next(new Error(error.message));
        }
    }else{
        next(new Error('Invalid server request!'))
    }
});

module.exports = {
    handleAddSingleOffer,
    handleAddMultipleOffer
}