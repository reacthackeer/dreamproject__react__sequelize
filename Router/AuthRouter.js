const { handleRegisterSingleUser, handleRegisterMultipleUser } = require('../Controller/auth/createController');
const { handleLoginSingleUser } = require('../Controller/auth/readController');

const authRouter = require('express').Router();

authRouter.post('/register', handleRegisterSingleUser);
authRouter.post('/login', handleLoginSingleUser);
authRouter.post('/register/multiple', handleRegisterMultipleUser);
module.exports = authRouter;