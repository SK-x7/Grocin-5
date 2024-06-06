const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  };

exports.getAllReviews = catchAsync(async (req,res,next)=>{
    const reviews = await Review.find();
    res.status(200).json({
        status:"success",
        message:"reviews retrieved successfully",
        
        data:{
            "total reviews": reviews.length,
            reviews
        }
    })
})
  
exports.getReview = catchAsync(async (req,res,next)=>{
    const review = await Review.findById(req.params.id);
    res.status(200).json({
        status:'success',
        message:"review found",
        data:{
            review
        }
    })
}) 
  
exports.createReview = catchAsync(async (req,res,next)=>{
    const newReview = await Review.create(req.body);
    res.status(200).json({
        status: 'success',
        message:"Review created successfully",
        data:{
            newReview
        }
    })
})


exports.updateReview = catchAsync(async (req,res,next)=>{
    const updatedReviews = await Review.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    
    
    if(!updatedReviews) return next(new AppError("there is no review with that id,please check again",404));
    res.status(200).json({
        status: 'success',
        message:"Review updated successfully",
        data:{
            updatedReviews
        }
    })
})

exports.deleteReview = catchAsync(async (req,res,next)=>{
    const deletedReview = await Review.findOneAndDelete(req.params.id);
    if(!deletedReview)  return next(new AppError("there is no review with that id,please check again",404));
    res.status(204).json({
        status:'success',
        message:"Review deleted succesfully",
        data:null
    })
})

