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
        enum:['cancelled',"pending", "successful"],
        default: "pending"
      },
      paymentMode:{
        type:String,
        enum:["pod","upi","card","null"],
        default: "null",
      },
      stripePaymentId: {
        type: String,
        required: false,
    },
      orderStatus: {
        type: String,
        enum: ['idle', 'arrived', 'dispatched', 'cancelled', 'delivered',],
        default: 'idle'
      },
      deliveryCode: {
        type: String,
        unique: true,
      },
      assignedDeliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
        default: null,
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


function generateDeliveryCode() {
  const prefix = 'DEL';
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 random chars
  const timestamp = Date.now().toString().slice(-4); // last 4 digits of timestamp
  return `${prefix}-${randomString}-${timestamp}`;
}

// Pre-save hook
orderSchema.pre('save', async function(next) {
  // Only generate if the document is *new*
  console.log("inside order hook (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)")
  if (this.isNew && !this.deliveryCode) {
    let newCode;
    let existingOrder;
    do {
      newCode = generateDeliveryCode();
      existingOrder = await mongoose.models.Order.findOne({ deliveryCode: newCode });
    } while (existingOrder); // Retry until unique

    this.deliveryCode = newCode;
  }
  next();
});


orderSchema.pre(/^find/, function(next) {
  
  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});



const Order = mongoose.model('Order', orderSchema);
module.exports = Order;






// FIXME active field retrive horhi h get pr