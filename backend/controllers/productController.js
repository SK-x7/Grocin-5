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
    console.log(req.originalUrl)
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


exports.searchProduct=catchAsync(async (req,res,next)=>{
    console.log(Date.now());
    console.log(req.query);
    const query = req.query.q;
    if(!query)   return next(new AppError("Query paramter is required",404));
        console.log(query,req.query)
        // Use a case-insensitive regex to search both the name and tags
        // const regex = new RegExp(query, 'i');
        const regex = new RegExp(`\\b${query}`, 'i');
        console.log(regex);
        const results = await Product.find({
            $or: [{ name: regex }, { tags: regex }]
        })
        // .lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents

        // Filter out duplicates based on the product's _id
        const uniqueResults = Array.from(new Set(results.map(product => product._id.toString())))
            .map(id => results.find(product => product._id.toString() === id));

        res.status(200).json({
            status: 'success',
            results: uniqueResults.length,
            data:{
                uniqueResults
            }
        });
})


// app.get('/search', async (req, res) => {
//     const query = req.query.q;
//     if (!query) {
//         return res.status(400).json({ error: 'Query parameter is required' });
//     }

//     try {
//         // Use a case-insensitive regex to search both the name and tags
//         const regex = new RegExp(query, 'i');
//         const results = await Product.find({
//             $or: [{ name: regex }, { tags: regex }]
//         }).lean(); // .lean() returns plain JavaScript objects instead of Mongoose documents

//         // Filter out duplicates based on the product's _id
//         const uniqueResults = Array.from(new Set(results.map(product => product._id.toString())))
//             .map(id => results.find(product => product._id.toString() === id));

//         res.json(uniqueResults);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });