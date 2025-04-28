
const DispatchManager=require('../models/dispatchManagerModel');
const Order=require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const DeliveryPartner=require('../models/deliveryPartnerModel');

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find().select("-paymentStatus -paymentMode -tipForDeliveryPartner -handlingCharge -deliveryFee ").populate('assignedDeliveryPartner')
    // const orders = await Order.find().populate('user').populate('assignedDeliveryPartner');
    res.status(200).json({
      status: 'success',
      data: { orders },
    });
  });

exports.assignDeliveryPartner = catchAsync(async (req, res, next) => {
    const { orderId, deliveryPartnerId } = req.body;
    console.log(orderId, deliveryPartnerId)
  
    const order = await Order.findById(orderId);
    if (!order || order.orderStatus !== 'arrived') {
      return next(new AppError('Order not found or not in "arrived" status', 400));
    }
  
    const dispatchManager = await DeliveryPartner.findById(deliveryPartnerId);
    console.log(dispatchManager)
    if (!dispatchManager || dispatchManager.status !== 'available') {
      return next(new AppError('Delivery partner not available', 400));
    }
  
    order.assignedDeliveryPartner = deliveryPartnerId;
    order.orderStatus = 'dispatched';
    dispatchManager.status = 'delivering';
    dispatchManager.currentOrder = orderId;
  
    await order.save();
    await dispatchManager.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Delivery partner assigned successfully',
      data: { order },
    });
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
  
    const updatedUser = await DispatchManager.findByIdAndUpdate(req.dispatchManager.id, filteredBody, {
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
      await DispatchManager.findByIdAndUpdate(req.dispatchManager.id,{active:false})
      
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
        currentUserId:req.dispatchManager.id,
      }
    })
    
  })
  
  exports.checkDuplicateEmail=catchAsync(async (req,res,next)=>{
    if(!req.body.email) return (next(new AppError("Please provide your email address",404)))
    const user=await DispatchManager.findOne({email:req.body.email})
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
    const user = await DispatchManager.findById(req.params.id).populate('reviews').populate("orders");
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
    const users = await DispatchManager.find().populate("orders");
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
      const updatedUser = await DispatchManager.findByIdAndUpdate(req.params.id, req.body, {
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
      const deletedUser = await DispatchManager.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return next(new AppError('No user found with that ID', 404));
      }
  
  
      res.status(204).json({
        status: 'success',
        message: 'DispatchManager deleted successfully',
        data: null
      });
    });
    
    exports.logout=(req, res,next) => {
      console.log('logout');
      res.clearCookie('jwt'); 
      res.status(200).json({ message: 'Logged out successfully' });
    };
    
  
    
    
    
 

 
  
  
  