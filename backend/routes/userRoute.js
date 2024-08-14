const express = require('express');
const authController = require("../controllers/authController")
const userController = require("../controllers/userController");
const router = express.Router();


router.get('/hello',function(req,res,next){
    // console.log("⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️")
    // console.log(req);
    res.status(200).json({
        status:'success',
        message :'Hey everything is working as intended,you can try different routes'
    })
})

router.post('/signup',authController.signUp);
router.post('/checkDuplicateEmail',userController.checkDuplicateEmail);
router.post('/login',authController.login);
router.post('/sendOtpEmail',authController.sendOtpEmail);
router.post('/verifyOtpEmail',authController.verifyOtp);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);

router.patch(
    '/updateMyPassword',
    authController.protect,
    authController.updatePassword
    );
  router.patch('/updateMe', authController.protect, userController.updateMe);
    router.delete('/deleteMe', authController.protect, userController.deleteMe);
    
    
    router.get("/getUser",userController.getAUser);
    router.get("/isLoggedIn",authController.protect,userController.isLoggedIn);
    router.post("/logout",authController.protect,userController.logout);
    
    
    
    
    router.route('/').get(userController.getAllUser).post(userController.createUser);
    router.route('/:id').get(userController.getUser).patch(userController.updateUser);
    router.route('/:id/getSavedAddresses').get(userController.getSavedAddressesOfUser);
    
    
    module.exports = router;
    
// router.post('/checkOtp',authController.sendOtp);// 
// router.post('/checkValid',authController.checkValid);
// router.post('/verify',authController.verify);//