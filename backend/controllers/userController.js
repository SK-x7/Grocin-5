const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//REVIEW - 

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

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
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
    await User.findByIdAndUpdate(req.user.id,{active:false})
    
    res.status(400).json({
      status:'success',
      data:null,  
    })
})

//FIXME - old one
exports.getAUser=catchAsync(async(req,res,next)=>{
  if(!req.body.email){
    return next(new AppError("please provide email",401));
  }
  const user = await User.findOne({email:req.body.email}).populate('reviews').populate('orders').populate('orders.products.productId');
  if(!user) return next(new AppError("There is no account with this email,check again",401));
  
  res.status(200).json({
    status: 'success',
    user
  })
  
  
})

exports.isLoggedIn=catchAsync(async(req,res,next)=>{
  console.log("HEYy");
  res.status(200).json({
    status: 'success',
    loggedIN:true,
    data:{
      currentUserId:req.user.id,
    }
  })
  
})

exports.checkDuplicateEmail=catchAsync(async (req,res,next)=>{
  if(!req.body.email) return (next(new AppError("Please provide your email address",404)))
  const user=await User.findOne({email:req.body.email})
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
  const user = await User.findById(req.params.id).populate('reviews').populate("orders");
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
  const users = await User.find().populate("orders");
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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
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
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'User deleted successfully',
      data: null
    });
  });
  
  exports.logout=(req, res,next) => {
    console.log('logout');
    res.clearCookie('jwt'); 
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  
  exports.getSavedAddressesOfUser = catchAsync( async (req,res,next)=>{
    const user = await User.findById(req.params.id).populate('reviews').populate("orders");
    console.log(user);
    let addresses;
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }else{
      addresses=user.addresses;
    }
    res.status(200).json({
      status: 'success',
      message: "Saved addresses fetched successfully",
      length: addresses.length,
      data:{
        addresses
      }
    })
  })
