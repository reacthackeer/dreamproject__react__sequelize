
const asyncHandler = require('express-async-handler');
const OfferModel = require('../../models/Offers');
const ProductModel = require('../../models/Product');
const { col, Sequelize } = require('sequelize');
const sequelize = require('../../config/database');

const handleGetSingleOffer = asyncHandler(async(req, res, next)=>{
    let {ID} = req.params;
    if(ID){ 
        try {
            let singleOfferGetResult = await OfferModel.findOne({where:{ID}});
            if(singleOfferGetResult && singleOfferGetResult.dataValues.ID){
                res.json({item: singleOfferGetResult.dataValues, status__code: 200});
            }else{
                next(new Error("Offer not founded!"))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server requested!'))
    }
});

const handleGetAllOffers = asyncHandler(async(req, res, next)=>{
    try {
        let allOfferResults = await OfferModel.findAll({});
        if(allOfferResults && allOfferResults.length){
            let allResult = [];
                allOfferResults.map((info) => {
                    allResult.push(info.dataValues);
                })
            res.json({items: allResult, status__code: 200})
        }else{
            next(new Error('Offer table empty!'))
        }
    } catch (error) {
        next(new Error(error.message))
    }
});

const handleGetAllMultipleOffersProduct = asyncHandler(async(req, res, next)=>{

    const count = `SELECT COUNT(*) FROM offers WHERE active="true"`;
    
    const page = Number(req.query?.page) || 1;
    let peerPage = Number(req.query?.peerPage) || 45;
        peerPage = peerPage > 70 ? 70 : peerPage
    
    try{
        const result = await getSqlProductLength(count); 
        if(result[0]['COUNT(*)'] > 0){   
            let total__products = Number(result[0]['COUNT(*)']);
            let total__page = Math.ceil(Number(result[0]['COUNT(*)']) / peerPage);
            const offset = (page - 1) * peerPage;
            const limit = peerPage; 
            const count1 = `SELECT p.ID, o.name, p.product__id, p.brand, p.child, p.parent, p.parent__father, p.infos, p.visible__url, p.total__sell FROM products AS p RIGHT JOIN offers AS o ON o.product__id=p.ID WHERE o.active="true"`;
            
            try {
                let result = await getAllMultipleOffers(count1, peerPage);
                res.json({...result, total__page, current__page: page, total__products, current__limit: [offset, offset+limit]});
            } catch (error) { 
                const error1 = new Error(error.message);
                    error1.status = 500;
                    next(error1);
            }
        }else{
            const newError = new Error('No product ');
                newError.status = 204;
            next(newError);
        }
    } catch (error) {
        let newError = new Error(error.message);
            newError.status=500;
            next(error);
    }
})
    

module.exports = {
    handleGetSingleOffer,
    handleGetAllOffers,
    handleGetAllMultipleOffersProduct
}