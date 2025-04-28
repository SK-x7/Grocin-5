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
    },
    availableStock: {
      type: Number,
      select: false,
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

// productSchema.virtual('priceAfterDiscount').get(function() {
//   return this.price - Math.round(this.price * this.discount / 100);
// });

// productSchema.path('priceAfterDiscount').validate(function (value) {
//   return value <= this.price;
// }, 'Discount should not exceed the product price.');

productSchema.index({ name: 1, category: 1, tags: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;


// server.js or app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const Product = require('./models/productModel'); // Assuming you have a Product model

// const app = express();

// mongoose.connect('your_mongo_db_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// app.get('/search', async (req, res) => {
//     const query = req.query.q;
//     if (!query) {
//         return res.status(400).json({ error: 'Query parameter is required' });
//     }
//     try {
//         const results = await Product.find({ name: new RegExp(query, 'i') }); // Case insensitive search
//         res.json(results);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
