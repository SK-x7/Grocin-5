const multer = require("multer")
const sharp = require("sharp");


const catchAsync = require("../utils/catchAsync")
const AppError= require("../utils/appError")
const Product = require("../models/productModel");

const multerStorage = multer.memoryStorage();

const imageController = require("../utils/imageFunctions");

const multerFilter = (req,file,cb)=>{
    if( file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new AppError("Not an image please upload images",404),false);
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
})



exports.uploadProductImages = upload.single('image')


exports.resizeProductImages = catchAsync(async (req,res,next)=>{
    if(!req.file){
        console.log("hjkbbb");
        return next();
    }    
    console.log("1️⃣")
    // let name="";
    if(!req.body.name){
        const product=await Product.findById(req.params.id);
        // name=product.name;
        req.file.filename=`Product-${product.name}-${Date.now()}.jpeg`
    }else{
        req.file.filename=`Product-${req.body.name}-${Date.now()}.jpeg`
    }
    console.log("2️⃣",req.file.filename);
    req.file.filename = req.file.filename.replace(/ /g, '-');

    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`public/productImages/${req.file.filename}`);
    console.log("3️⃣");
    
    next();
})



exports.getAllProducts=catchAsync(async(req,res,next)=>{
    const products =await Product.find();
    res.status(200).json({
        status: 'success',
        "total products" : products.length,
        data:{
            products
        }
    })
})

exports.createProduct=catchAsync(async(req,res,next)=>{
    const newProduct =await Product.create(req.body);
    res.status(200).json({
        status: 'success',
        message:"Product created successfully",
        data:{
            newProduct
        }
    })
})

 
exports.getProduct = catchAsync(async(req,res,next)=>{
    if(!req.params.id)  return next(new AppError("Please provide the id of product,you want to update",404));
    const product = await Product.findById(req.params.id).populate('reviews');
    if(!product)  return next(new AppError("No product found with that id.",404))
    res.status(200).json({
        status:"success",
        message:"Product found with id" + req.params.id,
        product
    })
})

exports.updateProduct = catchAsync(async (req,res,next)=>{
    // console.log(req.body,"➕")
    // console.log(req.file,"❌")
    let obj={...req.body}
    if(!req.params.id)    return next(new AppError("please provide id of product,you want to update",404))
    
    if(req.file){
        console.log(obj,"1️⃣");
        if(!req.file.filename)  return next(new AppError("please provide a image",404))
        let uploadDirectory="public/productImages";
        let url=await imageController.findUrl(req.file.filename,uploadDirectory);
        console.log(typeof url,"10")
        console.log(url,"11")
        
        obj.image=req.file.filename
        obj.name=req.body.name
        url = url.replace(/\\/g, '/');
        obj.imageUrl=url;
        console.log(obj,"🥲")
    }else{
        obj=req.body
    }
    
    const updatedProduct= await Product.findByIdAndUpdate(req.params.id,obj,{
        new:true,
        runValidators:true
    })
    
    if(!updatedProduct)   return next(new AppError("please provide valid id of a product to update",404))

    
    res.status(200).json({
        status:"success",
        message:"product updated successfully",
        data:{
            updatedProduct
        }
    })
})
