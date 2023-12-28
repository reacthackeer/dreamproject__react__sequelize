const asyncHandler = require('express-async-handler');
const User = require('../../models/User');
const { generateToken } = require('../../utils/jsonwebtoken');
const { hashPassword } = require('../../utils/Password');

const handleRegisterSingleUser = asyncHandler(async(req, res, next) => {
    let allPropertyStore = [ 
        'name'
        ,'email'
        ,'phone'
        ,'role'
        ,'designation'
        ,'password'
        ,'user__id'
        ,'store__email'
        ,'store__id'
        ,'address'
        ,'img__src'
        ,'balance'
        ,'point'
    ]
    let resultIndex = [];
    for(let property in req.body){
        let index = allPropertyStore.indexOf(property);
        if(index === -1){
            resultIndex.push('haveEmpty');
        }
    }
    if(resultIndex.length === 0){
        let userInfo = req.body;
        try {
            let hashPasswordResult = await hashPassword(userInfo.password);
            if(hashPasswordResult && hashPasswordResult.status__code === 200){
                userInfo.password = hashPasswordResult.password;
                try {
                    let result = await User.create(userInfo);
                    if(result && result.email){  
                        try {
                            let userInfo = result.dataValues;  
                            let tokenResult = await generateToken(userInfo); 
                            delete userInfo.password;
                            res.json({...userInfo, tokenResult: tokenResult})
                        } catch (error) { 
                            next(new Error(error.message));
                        }
                    }else{
                        next(new Error("Internal server  error!"))
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('Internal server error while encrypting your password!'))
            }
        } catch (error) {
            next(new Error(error.message))
        }
    }else{
        next(new Error('Invalid server requested!'));
    }
}); 

const handleRegisterMultipleUser = asyncHandler(async(req, res, next) => {
    if(req.body.length){
        try {
            let result = await User.bulkCreate(req.body);
            if(result && result.length){ 
                res.json(result)
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

module.exports = { 
    handleRegisterSingleUser, 
    handleRegisterMultipleUser     
}