const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsync = require("../utils/catchAsync")
const AppError= require("../utils/appError")
const Order = require("../models/orderModel");
exports.getCheckOutSession=catchAsync(async(req,res,next)=>{

    // console.log(port);
    const session = await stripe.checkout.sessions.create({
        
        // success_url:`${req.get('referer')}home`,
        // return_url: `${req.get('referer')}return`,
        return_url: `${req.get('referer')}return?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url:`${req.get('referer')}`,
        
        customer_email:req.user.email,
        client_reference_id:req.user.email,
       ui_mode: 'embedded',
        line_items: req.body.products,
        mode: 'payment',
      });
      console.log(session,"╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯╰(*°▽°*)╯");
      res.status(200).json({
        status: 'success',
        data:{
            clientSecret:session.client_secret,
            sessionId:session.id,
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
      customer_email: session.customer_details.email
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
