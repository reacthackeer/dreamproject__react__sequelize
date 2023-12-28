const asyncHandler = require('express-async-handler');
const User = require('../../models/User');
const { comparePasswords } = require('../../utils/Password');
const { generateToken } = require('../../utils/jsonwebtoken');

const handleLoginSingleUser = asyncHandler(async(req, res, next)=>{
    let {email, phone, password} = req.body;
    if(email && phone && password){ 
        try { 
            let getSingleUserResult = await User.findOne({
                where: {
                    phone,
                    email
                }
            });
            let userInfo = getSingleUserResult?.dataValues;
            if(userInfo && userInfo.email){
                userInfo.address = JSON.parse(userInfo.address);
                try {
                    let comparePasswordResult = await comparePasswords(password, userInfo.password);
                    if(comparePasswordResult && comparePasswordResult.status__code === 200){
                        try {
                            let tokenResult = await generateToken(userInfo);
                            delete userInfo.password;
                            res.json({...userInfo, token: tokenResult});
                        } catch (error) {
                            next(new Error(error.message))
                        }
                    }else{
                        next(new Error('Invalid password'));
                    }
                } catch (error) {
                    next(new Error(error.message))
                }
            }else{
                next(new Error('User not founded!'))
            }

                    // try {
                    //     let result = await comparePasswords(password, item.password);
                    //         if(result.status__code === 200){
                    //             try {
                    //                 let userInfo = item;  
                    //                     userInfo.address = controllerUtils.bufferDataConverter(userInfo.address);
                    //                 let tokenResult = await generateToken(userInfo);
                    //                 delete userInfo.password;

                    //                 res.json({...userInfo, token: tokenResult})
                    //             } catch (error) {
                    //                 next(new Error(error.message));
                    //             }
                    //         }else{
                    //             res.json(result);
                    //         }
                    // } catch (error) {
                    //     next(new Error(error.message));
                    // }
        } catch (error) {
            next(new Error(error.message));
        } 
    }else{
        next(new Error('Invalid server request!'))
    } 
})


module.exports = { 
    handleLoginSingleUser, 
}