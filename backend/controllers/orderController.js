const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync")
const AppError= require("../utils/appError")
const Order = require("../models/orderModel");
const DeliveryPartner=require("../models/deliveryPartnerModel");
const Product=require("../models/productModel");
// exports.getCheckOutSession=catchAsync(async(req,res,next)=>{

//     // console.log(port);
//     const session = await stripe.checkout.sessions.create({
        
//         success_url:`${req.get('referer')}home`,
//         // return_url: `${req.get('referer')}return`,
//         // return_url: `${req.get('referer')}return?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url:`${req.get('referer')}checkout`,
        
//         customer_email:req.user.email,
//         client_reference_id:req.user.email,
//     //    ui_mode: 'embedded',
//         line_items: req.body.products,
//         mode: 'payment',  
//       });
//       console.log(session,"╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯");
//       res.status(200).json({
//         status: 'success',
//         data:{
//             clientSecret:session.client_secret,
//             sessionId:session.id,
//         }
//       })
    
// })


exports.getCheckOutSession=catchAsync(async(req,res,next)=>{
    //FIXME - checks lgane h
        // console.log(port);
        console.log(req.body);
        const line_items=req.body.line_Items;
        const orderId = req.body.orderId

        const order = await Order.findById(orderId)
        
        const session = await stripe.checkout.sessions.create({
            
            // success_url:`${req.get('referer')}p`,
            // return_url: `${req.get('referer')}return`,
            line_items: line_items,
            success_url: `${req.get('referer')}return?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${req.get('referer')}checkout`,
            
            customer_email:req.user.email,
            client_reference_id:req.user.email,
        //    ui_mode: 'embedded',
            // line_items: req.body.products,
            mode: 'payment',  
            payment_intent_data: {
                metadata: { orderId },
            },
          });
          
          order.stripePaymentId = session.payment_intent
          await order.save()
          console.log(session,"╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯");
          res.status(200).json({
            status: 'success',
            data:{
                session
            }
          })
        
    })


exports.getStripeSessionStatus=catchAsync(async (req, res) => {
    // console.log(req.query.session_id)
    // console.log(req.params);
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    // console.log(session);
    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details.email,
      payment_intent: session.payment_intent
    });
  });




exports.getAllOrders=catchAsync(async(req,res,next)=>{
    const orders =await Order.find().populate('user').populate('products.productId');
    res.status(200).json({
        status: 'success',
        TotalOrders : orders.length,
        data:{
            orders
        }   
    })
})

exports.createOrder=catchAsync(async(req,res,next)=>{
    console.log(req.body)
    const {products} = req?.body
    // Check and decrement availableStock for each product
    for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
            return next(new AppError(`Product with ID ${item.productId} not found`, 404));
        }

        if (product.availableStock < item.quantity) {
            return next(new AppError(`Insufficient stock for product: ${product.name}`, 400));
        }

        product.availableStock -= item.quantity;
        await product.save();
    }
    const obj={
        user: req?.user?.id,
        products: req?.body?.products,
        deliveryFee:req?.body?.deliveryFee,
        handlingCharge:req?.body?.handlingCharge,
        tipForDeliveryPartner:req?.body?.tipForDeliveryPartner,
        totalPrice:req?.body?.totalPrice,
    }
    console.log(obj);
    
    const newOrder =await Order.create(obj);
    
    
    console.log(newOrder)
    res.status(200).json({
        status: 'success',
        message:"Order created successfully",
        data:{
            newOrder
        }
    })
})

 
exports.getOrder = catchAsync(async(req,res,next)=>{
    if(!req.params.id)  return next(new AppError("Please provide the id of order",404));
    const order = await Order.findById(req.params.id).populate('user').populate('products.productId');
    if(!order)  return next(new AppError("No product found with that id.",404))
    res.status(200).json({
        status:"success",
        message:"Order found with id" + req.params.id,
        order
    })
})

exports.getAllOrdersByUser=catchAsync(async(req,res,next)=>{
    const userId = req.params.userId; // Get the user ID from the route parameters
    console.log(userId);
    const orders =await Order.find({ user: userId }).populate('user').populate('products.productId').sort('-createdAt');;
    if (!orders) {
        return next(new AppError('No orders found for this user', 404));
      }
    res.status(200).json({
        status: 'success',
        TotalOrders : orders.length,
        data:{
            orders
        }   
    })
})


// exports.getOrdersByUser = catchAsync(async (req, res, next) => {
//     const userId = req.params.userId; // Get the user ID from the route parameters
//     const orders = await Order.find({ user: userId }).populate('user').populate('products.productId');
  
//     if (!orders) {
//       return next(new AppError('No orders found for this user', 404));
//     }
  
//     res.status(200).json({
//       status: 'success',
//       TotalOrders: orders.length,
//       data: {
//         orders,
//       },
//     });
//   });

exports.updateOrder = catchAsync(async (req,res,next)=>{
    // console.log(req.body,"➕")
    // console.log(req.file,"❌")
    // let obj={...req.body}
    if(!req.params.id)    return next(new AppError("please provide id of order,you want to update",404))
    
    // if(req.file){
    //     console.log(obj,"1️⃣");
    //     if(!req.file.filename)  return next(new AppError("please provide a image",404))
    //     let uploadDirectory="public/productImages";
    //     let url=await imageController.findUrl(req.file.filename,uploadDirectory);
    //     console.log(typeof url,"10")
    //     console.log(url,"11")
        
    //     obj.image=req.file.filename
    //     obj.name=req.body.name
    //     url = url.replace(/\\/g, '/');
    //     obj.imageUrl=url;
    //     console.log(obj,"🥲")
    // }else{
    //     obj=req.body
    // }
    console.log(req.body,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    const updatedOrder= await Order.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    
    if(!updatedOrder)   return next(new AppError("please provide valid id of a product to update",404))

    
    res.status(200).json({
        status:"success",
        message:"Order updated successfully",
        data:{
            updatedOrder
        }
    })
})

exports.verifyDeliveryCode = catchAsync(async (req, res, next) => {
    const orderId = req.params?.id || null
    const deliveryCode = req.params?.code || null
  
    if(!deliveryCode || !orderId) {
        return next(new AppError('Please provide order id and delivery code', 400));
    }
    
    const order = await Order.findById(orderId);
    if (!order || order.orderStatus !== 'dispatched') {
      return next(new AppError('Order not found or not in "dispatched" status', 400));
    }
  
    if (order.deliveryCode !== deliveryCode) {
      return next(new AppError('Invalid delivery code', 400));
    }
    //since its a succesful delivery we will update the original stock
    for (const item of order.products) {
        const product = await Product.findById(item.productId._id);
        product.stock -= item.quantity;
        await product.save();
    }

    order.orderStatus = 'delivered';
    order.paymentStatus = 'successful';
    const deliveryPartner = await DeliveryPartner.findById(order.assignedDeliveryPartner);
    deliveryPartner.status = 'idle';
    deliveryPartner.currentOrder = null;
  
    await order.save();
    await deliveryPartner.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Order successfully delivered',
      data:{
        order
      }
    });
  });
  
  
  //cancel
  exports.cancelOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.id;

    if (!orderId) {
        return next(new AppError('Please provide the order ID to cancel', 400));
    }

    const order = await Order.findById(orderId).populate('products.productId');

    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    // Check if the order status is 'arrived'
    if (order.orderStatus !== 'arrived') {
        return next(new AppError('Order can only be canceled when its status is "arrived"', 400));
    }
    
    //increment the available stock
    for (const item of order.products) {
        const product = await Product.findById(item.productId._id);

        product.availableStock += item.quantity;

        // Ensure availableStock does not exceed stock
        if (product.availableStock > product.stock) {
            product.availableStock = product.stock;
        }

        await product.save();
    }
    

    // If payment was successful, initiate a refund
    if (order.paymentStatus === 'successful' && order.paymentMode === "card") {
        if (!order.stripePaymentId) {
            return next(new AppError('No Stripe payment ID found for this order', 400));
        }

        try {
            const refund = await stripe.refunds.create({
                payment_intent: order.stripePaymentId,
            });

            console.log('Refund successful:', refund);
        } catch (err) {
            console.error('Refund failed:', err);
            return next(new AppError('Failed to process refund. Please try again later.', 500));
        }
    }

    // Update the order status to 'cancelled'
    order.orderStatus = 'cancelled';
    order.paymentStatus = 'cancelled';
    await order.save();

    res.status(200).json({
        status: 'success',
        message: order.paymentMode === 'card' ? "Order cancelled. Your payment will be refunded within 1 business day."   :'Order has been successfully cancelled.',
        data: {
            order,
        },
    });
});