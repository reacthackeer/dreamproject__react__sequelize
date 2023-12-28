const asyncHandler = require('express-async-handler');

const handleAddNewProduct = asyncHandler(async(req, res, next) => {

});
const handleGetSingleProductById = asyncHandler(async(req, res, next) => {

});
const handleGetSingleFatherProduct = asyncHandler(async(req, res, next) => {

});
const handleGetSingleParentProduct = asyncHandler(async(req, res, next) => {

});
const handleGetSingleChildProduct = asyncHandler(async(req, res, next) => {

});
const handleGetAllMultipleOffersProduct = asyncHandler(async(req, res, next) => {

});
const handleGetAllSingleOfferProduct = asyncHandler(async(req, res, next) => {

});
const handleGetAllSingleBrandProduct = asyncHandler(async(req, res, next) => {

});
const handleGetAllSearchProduct = asyncHandler(async(req, res, next) => {

});
const handleEditSingleProduct = asyncHandler(async(req, res, next) => {

});
const handleGetSingleChildSimilarProductProduct = asyncHandler(async(req, res, next) => {

});
const handleGetAllSingleBrandSimilarProduct = asyncHandler(async(req, res, next) => {

});
const handleGetSingleProductByJustId = asyncHandler(async(req, res, next) => {

});
const handleGetAllProduct = asyncHandler(async(req, res, next) => {

});

module.exports = {
    handleEditSingleProduct,
    handleAddNewProduct,
    handleGetAllSearchProduct,
    handleGetAllSingleBrandProduct, 
    handleGetAllSingleOfferProduct,
    handleGetAllMultipleOffersProduct,  
    handleGetSingleChildProduct,
    handleGetSingleParentProduct,
    handleGetSingleFatherProduct,
    handleGetSingleProductById,
    handleGetSingleChildSimilarProductProduct,
    handleGetAllSingleBrandSimilarProduct,
    handleGetSingleProductByJustId,
    handleGetAllProduct
}