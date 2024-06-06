const mongoose = require('mongoose');
const Product = require("../models/productModel")

const reviewSchema = new mongoose.Schema({
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: true,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
},  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  reviewSchema.pre(/^find/, function(next) {
    // this.populate({
    //   path: 'tour',
    //   select: 'name'
    // }).populate({
    //   path: 'user',
    //   select: 'name photo'
    // });
  
    this.populate({
      path: 'user',
      select: 'name photo'
    });
    next();
  });
  
  reviewSchema.statics.calcAverageRatings = async function(productId) {
    const stats = await this.aggregate([
      {
        $match: { product: productId }
      },
      {
        $group: {
          _id: '$product',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);
    // console.log(stats);
  
    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
      });
    }
  };
  
  //FIXME - 
  reviewSchema.statics.ratingsDistribution = async function(productId) {
    // const stats = await Review.aggregate([
    //   {
    //     $match: { product: productId},
    //   },
    //   {
    //     $group: {
    //       _id: '$rating',
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       rating: '$_id',
    //       count: 1,
    //       percentage: { $multiply: [{ $divide: ['$count', { $sum: '$count' }] }, 100] },
    //     },
    //   },
    // ]);
    
    const result = await Review.aggregate([
      {
        $match: { product: productId },
      },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          rating: '$_id',
          count: 1,
        },
      },
      {
        $group: {
          _id: null,
          ratings: { $push: '$$ROOT' },
          totalReviews: { $sum: '$count' },
        },
      },
      {
        $unwind: '$ratings',
      },
      {
        $project: {
          rating: '$ratings.rating',
          count: '$ratings.count',
          percentage: { $multiply: [{ $divide: ['$ratings.count', '$totalReviews'] }, 100] },
        },
      },
    ]);
    
    
    
    
    // console.log(stats);
    // console.log(result);
    // console.log(result.length>0)
    if(result.length>0){
      await Product.findByIdAndUpdate(productId,{
        ratingDistribution:result,
      })
    }else{
      await Product.findByIdAndUpdate(productId,{
        ratingDistribution:[],
      })
    }
    
  
    // if (stats.length > 0) {
    //   await Product.findByIdAndUpdate(productId, {
    //     ratingsQuantity: stats[0].nRating,
    //     ratingsAverage: stats[0].avgRating
    //   });
    // } else {
    //   await Product.findByIdAndUpdate(productId, {
    //     ratingsQuantity: 0,
    //     ratingsAverage: 4.5
    //   });
    // }
  };
  
  reviewSchema.post('save', function() {
    // this points to current review
    this.constructor.calcAverageRatings(this.product);
    this.constructor.ratingsDistribution(this.product)
  });
  
  // findByIdAndUpdate
  // findByIdAndDelete
  reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.p = await this.findOne();
    // console.log(this.r);
    next();
  });
  
  reviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.p.constructor.calcAverageRatings(this.p.product);
    await this.p.constructor.ratingsDistribution(this.p.product);
  });
  
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
