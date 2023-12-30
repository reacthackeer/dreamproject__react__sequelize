const { handleAddSingleOffer, handleAddMultipleOffer } = require('../Controller/offer/createController');
const { handleGetSingleOffer, handleGetAllOffers, handleGetAllMultipleOffersProduct } = require('../Controller/offer/readController');

const offersRouter = require('express').Router();

offersRouter.get('/multiple', handleGetAllOffers);
offersRouter.get('/single/:ID', handleGetSingleOffer);
offersRouter.get('/', handleGetAllMultipleOffersProduct);
offersRouter.post('/', handleAddSingleOffer);
offersRouter.post('/multiple', handleAddMultipleOffer);
// offersRouter.put('/single/:ID', handleAddSingleOffer);
// offersRouter.delete('/single/:ID', handleDeleteSingleOffer);
// offersRouter.get('/:offer', handleGetAllSingleOfferProduct);


module.exports = offersRouter;