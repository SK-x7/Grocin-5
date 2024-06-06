const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          unitPrice: {
            type: Number,
            required: true
          },
          totalPrice: {
            type: Number,
            required: true
          }
        }
      ],
      
      deliveryFee: {
        type: Number,
        required: true
      },
      handlingCharge: {
        type: Number,
        required: true
      },
      tipForDeliveryPartner: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      },
      paymentStatus:{
        type:String,
        enum:["pending", "successful"],
        default: "pending"
      },
      paymentMode:{
        type:String,
        enum:["pod","upi","card","null"],
        default: "null",
      },
      orderStatus: {
        type: String,
        enum: ['idle','arrived', 'cancelled', 'successful',],
        default: 'idle'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    },
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Order = mongoose.model('Order', orderSchema);


orderSchema.pre(/^find/, function(next) {

  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});



module.exports = Order;






// FIXME active field retrive horhi h get pr