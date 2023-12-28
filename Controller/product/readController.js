
const asyncHandler = require('express-async-handler');
const ProductModel = require('../../models/Product');
const { Op } = require('sequelize');
const controllerUtils = require('../../utils/filterUtils');

const handleGetAllSearchProduct = asyncHandler(async(req, res, next)=>{
    const searchStr = req.params.search_string;
    let newSearchString = searchStr.toLowerCase().replace(/ /g,'%');
        newSearchString = `%${newSearchString}%`
    const page = Number(req.query?.page) || 1;
    let peerPage = Number(req.query?.peerPage) || 45;
        peerPage = peerPage > 70 ? 70 : peerPage 
        try {
            let allProductCountResult = await ProductModel.count({
                attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                where: {
                    visible__url: {
                        [Op.like]: newSearchString
                    }
                }
            })
            if(allProductCountResult && allProductCountResult > 0){
                let total__products = allProductCountResult;
                let total__page = Math.ceil(Number(allProductCountResult) / peerPage);
                const offset = (page - 1) * peerPage;
                const limit = peerPage;
                try {
                    let allSearchProductResult = await ProductModel.findAll({
                        attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                        where: {
                            visible__url: {
                                [Op.like]:  newSearchString
                            }
                        },
                        offset: offset,
                        limit: limit
                    }); 
                    if(allSearchProductResult && allSearchProductResult.length){

                        let allProducts = controllerUtils.multipleDataValueConverter(allSearchProductResult);
                        const {shortedProduct, lowPrice, highPrice} = controllerUtils.getSortAndHighAndLowPrice(allProducts);
                        const {filterNavbar} = controllerUtils.brandFilter(shortedProduct);
                        res.json({ filterNavbar: filterNavbar, products: shortedProduct, lowPrice, highPrice, status__code: 200, current__product__length: allProducts.length,total__page, total__products, current__limit: [offset, offset+limit]});

                    }else{
                        next(new Error('Invalid server request'));
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                const newError = new Error('No product founded');
                newError.status = 204;
                next(newError);
            }
        } catch (error) {
            next(new Error(error.message))
        }
});

const handleGetAllSingleBrandProduct = asyncHandler(async(req, res, next)=>{
    const brand = req.params.brand;  
    const page = Number(req.query?.page) || 1;
    let peerPage = Number(req.query?.peerPage) || 45;
        peerPage = peerPage > 70 ? 70 : peerPage 
        try {
            let allProductCountResult = await ProductModel.count({
                attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                where: {
                    brand
                }
            })
            if(allProductCountResult && allProductCountResult > 0){
                let total__products = allProductCountResult;
                let total__page = Math.ceil(Number(allProductCountResult) / peerPage);
                const offset = (page - 1) * peerPage;
                const limit = peerPage;
                try {
                    let allSearchProductResult = await ProductModel.findAll({
                        attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                        where: {
                            brand
                        },
                        offset: offset,
                        limit: limit
                    }); 
                    if(allSearchProductResult && allSearchProductResult.length){
                        let allProducts = controllerUtils.multipleDataValueConverter(allSearchProductResult);
                        const {shortedProduct, lowPrice, highPrice} = controllerUtils.getSortAndHighAndLowPrice(allProducts);
                        const {filterNavbar} = controllerUtils.brandFilter(shortedProduct);
                        res.json({ filterNavbar: filterNavbar, products: shortedProduct, lowPrice, highPrice, status__code: 200, current__product__length: allProducts.length,total__page, total__products, current__limit: [offset, offset+limit]});
                    }else{
                        next(new Error('Invalid server request'));
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                const newError = new Error('No product founded');
                newError.status = 204;
                next(newError);
            }
        } catch (error) {
            next(new Error(error.message))
        }
})

const handleGetAllProduct = asyncHandler(async(req, res, next)=>{ 
    const page = Number(req.query?.page) || 1;
    let peerPage = Number(req.query?.peerPage) || 45;
        peerPage = peerPage > 70 ? 70 : peerPage 
        try {
            let allProductCountResult = await ProductModel.count({
                attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
            })
            if(allProductCountResult && allProductCountResult > 0){
                let total__products = allProductCountResult;
                let total__page = Math.ceil(Number(allProductCountResult) / peerPage);
                const offset = (page - 1) * peerPage;
                const limit = peerPage;
                try {
                    let allSearchProductResult = await ProductModel.findAll({
                        attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                        offset: offset,
                        limit: limit
                    }); 
                    if(allSearchProductResult && allSearchProductResult.length){
                        let allProducts = controllerUtils.multipleDataValueConverter(allSearchProductResult);
                        const {shortedProduct, lowPrice, highPrice} = controllerUtils.getSortAndHighAndLowPrice(allProducts);
                        const {filterNavbar} = controllerUtils.brandFilter(shortedProduct);
                        res.json({ filterNavbar: filterNavbar, products: shortedProduct, lowPrice, highPrice, status__code: 200, current__product__length: allProducts.length,total__page, total__products, current__limit: [offset, offset+limit]});
                    }else{
                        next(new Error('Invalid server request'));
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                const newError = new Error('No product founded');
                newError.status = 204;
                next(newError);
            }
        } catch (error) {
            next(new Error(error.message))
        }
})

const handleGetAllSingleBrandSimilarProduct = asyncHandler(async(req, res, next)=>{ 
    let {brand, product__id} = req.params;
    const page = Number(req.query?.page) || 1;
    let peerPage = Number(req.query?.peerPage) || 45;
        peerPage = peerPage > 70 ? 70 : peerPage 
        try {
            let allProductCountResult = await ProductModel.count({
                attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                where: {
                    brand,
                    product__id: {
                        [Op.not]: product__id
                    }
                }
            });
            if(allProductCountResult && allProductCountResult > 0){
                let total__products = allProductCountResult;
                let total__page = Math.ceil(Number(allProductCountResult) / peerPage);
                const offset = (page - 1) * peerPage;
                const limit = peerPage;
                try {
                    let allSearchProductResult = await ProductModel.findAll({
                        attributes: ['ID', 'product__id', 'child', 'parent', 'parent__father', 'quantity', 'total__sell', 'infos', 'brand', 'visible__url', 'visible', 'up'],
                        offset: offset,
                        limit: limit,
                        where: {
                            brand,
                            product__id: {
                                [Op.not]: product__id
                            }
                        }
                    }); 
                    if(allSearchProductResult && allSearchProductResult.length){
                        let allProducts = controllerUtils.multipleDataValueConverter(allSearchProductResult);
                        const {shortedProduct, lowPrice, highPrice} = controllerUtils.getSortAndHighAndLowPrice(allProducts);
                        const {filterNavbar} = controllerUtils.brandFilter(shortedProduct);
                        res.json({ filterNavbar: filterNavbar, products: shortedProduct, lowPrice, highPrice, status__code: 200, current__product__length: allProducts.length,total__page, total__products, current__limit: [offset, offset+limit]});
                    }else{
                        next(new Error('Invalid server request'));
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                const newError = new Error('No product founded');
                newError.status = 204;
                next(newError);
            }
        } catch (error) {
            next(new Error(error.message))
        }
})
module.exports = {
    handleGetAllSearchProduct,
    handleGetAllSingleBrandProduct,
    handleGetAllProduct,
    handleGetAllSingleBrandSimilarProduct
}