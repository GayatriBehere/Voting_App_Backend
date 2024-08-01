
const express = require('express')
const router=express.Router();
const { postData,changePassword,login} = require('./../Controllers/user');

const {jwtAuthMiddleware,generatetoken}=require('./../jwt')


//new user can register according to thier role like voter and id //and also at the time of register user get token
router.post('/signup',postData)
router.post('/login',login) 
router.put('/profile/password',jwtAuthMiddleware,changePassword);


module.exports=router;