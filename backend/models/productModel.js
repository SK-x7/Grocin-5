const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    image: String,
    imageUrl:String,
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    // priceAfterDiscount: {
    //   type: Number,

    // },
    speciality: {
      type: String,
    },
    description: { 
      type: String,
      trim: true,
    },
    shelfLife: {
      type: String,
    },
    stock: {
      type: Number,
      select: false,
      required: true,
      min: [0, 'Stock cannot be less than 0'],
    },
    availableStock: {
      type: Number,
      select: true,
      required: true,
      min: [0, 'Available stock cannot be less than 0'],
      
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    ratingDistribution: [
      {
        rating: {
          type: Number,
          required: true,
          enum: [1, 2, 3, 4, 5], // Ensure the rating is within the valid range
        },
        count: {
          type: Number,
          default: 0,
        },
        percentage: {
          type: Number,
          default: 0,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    // reviews:[{
    //   type:mongoose.Schema.ObjectId,
    //   ref:'Review'
    // }]
    // Other product-related fields
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate
productSchema.virtual('reviews',{
  ref:'Review',
  foreignField:'product',
  localField:"_id"
  
})



productSchema.virtual("priceAfterDiscount").get(function (next) {
  const discountedValue =
    this.price - Math.round((this.price * this.discount) / 100);

  // Custom validation for priceAfterDiscount
  if (discountedValue > this.price) {
    // throw new Error('Discounted price should not exceed the original price.');
    next(new AppError("Discounted price should not exceed the original price"));
  }

  return Math.round(discountedValue);
});

productSchema.pre('save', function (next) {
  // Ensure availableStock is never less than 0
  if (this.availableStock < 0) {
      return next(new AppError('Available stock cannot be less than 0'));
  }
  next();
});


productSchema.pre('save', function (next) {
  // Ensure availableStock never exceeds stock
  if (this.availableStock > this.stock) {
      return next(new AppError('Available stock cannot exceed original stock'));
  }

  // Set isInStock based on availableStock
  if (this.availableStock <= 0) {
      this.isInStock = false; // Out of stock
  } else if (this.availableStock < this.stock * 0.1) {
      this.isInStock = false; // Low stock threshold (10% of original stock)
  } else {
      this.isInStock = true; // In stock
  }

  next();
});

productSchema.index({ name: 1, category: 1, tags: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
