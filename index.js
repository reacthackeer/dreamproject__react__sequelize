
// index.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
let origin = process.env.ORIGIN; 
const io = socketIO(server,{
  pingInternal: 30000,
  pingTimeOut:  40000,
  cors: {origin}
}); 
const PORT = process.env.PORT || 3000;  

global.io = io;


// application configuration start
app.use(express.json({limit: '1020mb'}));
app.use(express.urlencoded({extended: true, limit: '1020mb'}))
app.use(cors({origin}));
app.use(bodyParser.json({limit: '1020mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1020mb'}));
app.use(fileUpload({limits: '1020mb'}));
app.use(express.static('uploads'));
// application configuration end

const sequelize = require('./config/database');
const handleSyncDatabase = async () => {
  try {
    let result = await sequelize.sync({force: false});
    console.log('Successfully database sync');
  } catch (error) { 
    console.log(error);
    console.log(`Internal server error!`);
  }
}

handleSyncDatabase()



// console.log(allEnv);

const User = require('./models/User'); 
const ConnectedList = require('./models/ConnectedList'); 
const brandRouter = require('./Router/BrandRouter');
const browsingHistoryRouter = require('./Router/BrowsingHistoryRouter');
const cartRouter = require('./Router/CartRouter');
const childRouter = require('./Router/ChildRouter');
const connectedListRouter = require('./Router/ConnectedListRouter');
const districtRouter = require('./Router/Geocode');
const geocode = require('./Router/Geocode');
const filterNavbar = require('./Router/FilterNavbar');
const orderRouter = require('./Router/OrderRouter');
const popularCategoryRouter = require('./Router/PopularCategory');
const paymentRouter = require('./Router/PaymentRouter');
const uploadRouter = require('./Router/UploadRouter');
const shopByCategoryRouter = require('./Router/ShopByCategoryRouter');
const shopByBrandRouter = require('./Router/ShopByBrandRouter');
const upNavbarRouter = require('./Router/UpNavbarRouter');
const parentFatherRouter = require('./Router/parentFatherRouter');
const parentRouter = require('./Router/ParentRouter');
const WishlistRouter = require('./Router/WishlistRouter');
const offersRouter = require('./Router/OffersRouter');
const authRouter = require('./Router/AuthRouter');
const productRouter = require('./Router/ProductRouter');

app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/browsing-history', browsingHistoryRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/child-navbar', childRouter);
app.use('/api/v1/connected-list', connectedListRouter);
app.use('/api/v1/geocode', geocode);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/popular-category', popularCategoryRouter);
app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/shop-by-category', shopByCategoryRouter);
app.use('/api/v1/shop-by-brand', shopByBrandRouter);
app.use('/api/v1/wishlist', WishlistRouter);
app.use('/api/v1/offers', offersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/up-navbar', upNavbarRouter);
app.use('/api/v1/parent-father-navbar', parentFatherRouter);
app.use('/api/v1/parent-father-navbar', parentFatherRouter);
app.use('/api/v1/parent-navbar', parentRouter);
app.use('/api/v1/filter-navbar', filterNavbar); 
app.use('/api/v1/products', productRouter);


app.post('/api/upload',async(req, res, next)=>{
  let file = req.files.file;
  let body = req.body;
  let userId = body.userId;
  if(file && userId){
    let fileExtension = file.name.split('.');
        fileExtension = '.'+fileExtension[fileExtension.length -1];
    let fileName = userId+'.png';
    try {
        let result = await file.mv(__dirname+'/uploads'+`/${fileName}`);
        try {
          let userUpdateResult = await User.update({src: `/${fileName}`},{where: {userId}});
          if(userUpdateResult && userUpdateResult[0]){
              try {
                let userInfo = await User.findOne({where: {userId}});
                res.json(userInfo)
              } catch (error) {
                next(new Error(error.message))
              }
          }else{
            next(new Error('Internal server error!'))
          }
        } catch (error) {
          next(new Error(error.message))
        }
    } catch (error) {
      next(new Error('Internal server error while uploading your profile image'))
    }
  }else{
    next(new Error('Invalid post request!'))
  }
})
app.get('/',(req, res)=>{
  res.send('<h1>Hello world</h1>');
})
app.get('/check',async (req, res)=> {
  try {
    let result = await ConnectedList.findAll({});
    res.json(result)
  } catch (error) {
    next(new Error(error.message))
  }
})
// Error handling middleware
app.use((err, req, res, next) => { 
  // Send an appropriate response to the client
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:3000`);
});  
