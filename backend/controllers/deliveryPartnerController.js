const DeliveryPartner = require('../models/deliveryPartnerModel');
const AppError=require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//TODO - get all assigned orders by a delivery partner

exports.getAssignedOrders = catchAsync(async (req, res, next) => {
  const deliveryPartner = await DeliveryPartner.findById(req.deliveryPartner.id).populate('currentOrder');
  res.status(200).json({
    status: 'success',
    data: { currentOrder: deliveryPartner.currentOrder },
  });
});

exports.changeStatus = catchAsync(async (req, res, next) => {
  const tempStatus = req.query?.status || null
  
  if(!tempStatus || (tempStatus!=="idle" && tempStatus!=="available")){
    return next(
      new AppError(
        "Status can only be idle or available",
        400
      )
    );
  } 
  
  const deliveryPartner = await DeliveryPartner.findById(req.deliveryPartner.id);
  if(deliveryPartner.currentOrder !== null || deliveryPartner.status==="delivering" ) {
    return next(
      new AppError(
        "You still have a pending order to deliver, please try after delivering current order.",
        400
      )
    );
  }
  if(tempStatus){
    deliveryPartner.status = tempStatus
    deliveryPartner.save()
    res.status(200).json({
      status: 'success',
      message: `Delivery partner status changed to ${tempStatus}`,
      data: { deliveryPartner },
    });
  }
  
});

const filterObj = (obj, ...allowedFields) => {
    let newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) {
        newObj[el] = obj[el];
      }
    });
    return newObj;
  };
  
  exports.updateMe = catchAsync(async (req, res, next) => {
    // create error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This is not for password updates. Please use /updateMyPassword",
          400
        )
      );
    }
  
    //update user document
  
    const filteredBody = filterObj(req.body, "name", "email");
  
    const updatedUser = await DeliveryPartner.findByIdAndUpdate(req.deliveryPartner.id, filteredBody, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  });
  
  exports.deleteMe = catchAsync(async(req,res,next)=>{
      await DeliveryPartner.findByIdAndUpdate(req.deliveryPartner.id,{active:false})
      
      res.status(400).json({
        status:'success',
        data:null,  
      })
  })
  
exports.isLoggedIn=catchAsync(async(req,res,next)=>{
    console.log("HEYy");
    res.status(200).json({
      status: 'success',
      loggedIN:true,
      data:{
        currentUserId:req.deliveryPartner.id,
      }
    })
    
  })
  
  exports.checkDuplicateEmail=catchAsync(async (req,res,next)=>{
    if(!req.body.email) return (next(new AppError("Please provide your email address",404)))
    const user=await DeliveryPartner.findOne({email:req.body.email})
    if(user){
      res.status(200).json({
        status: 'fail',
        message:"Duplicate email"
      })
    }else{
      res.status(200).json({
        status:'success',
        message:"you can use this email"
      })
    }
  })
  
  // ---------------------------------------------------------------------------------------------------------------------------
  exports.getUser = catchAsync( async (req,res,next)=>{
    const user = await DeliveryPartner.findById(req.params.id).populate('reviews').populate("orders");
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      message: "user found successfully",
      data:{
        user
      }
    })
  })
  
  exports.getAllUser = catchAsync( async (req,res,next)=>{
    const users = await DeliveryPartner.find().populate("orders");
    // if (!user) {
    //   return next(new AppError('No user found with that ID', 404));
    // }
    res.status(200).json({
      status: 'success',
      message: "user found successfully",
      data:{
        "total users":users.length,
        users
      }
    })
  })
  
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not defined! Please use /signup instead'
    });
  };
  
  exports.updateUser =catchAsync(async (req, res, next) => {
      const updatedUser = await DeliveryPartner.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!updatedUser) {
        return next(new AppError('No user found with that ID', 404));
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          data: updatedUser
        }
      });
    });
    
    exports.deleteUser =
    catchAsync(async (req, res, next) => {
      const deletedUser = await DeliveryPartner.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return next(new AppError('No user found with that ID', 404));
      }
  
      res.status(204).json({
        status: 'success',
        message: 'DeliveryPartner deleted successfully',
        data: null
      });
    });
    
    exports.logout=(req, res,next) => {
      console.log('logout');
      res.clearCookie('jwt'); 
      res.status(200).json({ message: 'Logged out successfully' });
    };
    
  
    
    
    
 
