const multer = require("multer")
const sharp = require("sharp");

const SubCategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');


const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();


const fs = require('fs');
const path = require('path');

//FIXME - pura kaam hone k baad ye image vala code move krna h


// const multerStorage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/subCategoryImages")
//     },
//     filename:(req,file,cb)=>{
//         console.log(req);
//         const ext = file.mimetype.split('/')[1];
//         cb(null,`sub-category-${req.body.name}-${Date.now()}.${ext}`);
        
//     }
    
// })

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



function findImagePathByFilename(filename, uploadDirectory) {
    const files = fs.readdirSync(uploadDirectory);
    // console.log("⤵️");
    // console.log(files);
    // console.log("⤵️");
    for (const file of files) {
      if (file.includes(filename)) {
        return path.join(uploadDirectory, file);
      }
    }
  
    // Return null if the file is not found
    return null;
  }

  
exports.findFilePath =catchAsync(async (req,res,next)=>{
    console.log(req.originalUrl,"🧨")
    if(!req.file){
      next();
        
    // console.log(req.url);
    // console.log(req.body);
    // console.log(req.file);
    }else{
        
        let uploadDirectory="";
        let TobeUpdated="";
    if(req.originalUrl.includes("subcategory")){
        uploadDirectory = "public/subCategoryImages"
        // TobeUpdated="SubCategory"
        TobeUpdated = SubCategory
    }else if(req.originalUrl.includes("category")){
        uploadDirectory = "public/categoryImages"
        // TobeUpdated="Category"
        TobeUpdated=Category
    }else if(req.originalUrl.includes("product")){
        uploadDirectory = "public/productImages"
        TobeUpdated=Product
        // TobeUpdated="Product"
    }
    
    
    
    
    if(!req.params.id) return next(new AppError(`please provide id of ${TobeUpdated}`));
    // const category = await ((TobeUpdated==="SubCategory")?Subcategory:Category).findById(req.body.id)
    const doc = await TobeUpdated.findById(req.params.id);

    
    // let doc="" 
    // if(TobeUpdated=="SubCategory"){
    //     doc=await SubCategory.findById(req.body.id)
    // }
    // else if(TobeUpdated=="Category"){
    //     doc=await Category.findById(req.body.id)
    // }
    // else if(TobeUpdated=="Product"){
    //     doc=await Category.findById(req.body.id)
    // }
    
    
    // console.log(category.image);
    // console.log("1");
    if(doc.image===undefined){
        console.log(doc,"❌")

        next();
    }else{
        const imagePath =findImagePathByFilename(doc?.image, uploadDirectory);

        if (imagePath) {
            console.log('Image found at:', imagePath);
            fs.unlink(imagePath, (err) => {
                if (err) {
              console.error('Error removing old image:', err);
            } else {
                console.log('Old image removed successfully.');
            }
            next();
        });
        } else {
          console.log('Image not found.');
          
          
          // uncomment if only finding image path 
          //   res.status(404).json({
              //     status:"failed"
        //   })
        next();
        // console.log("---------------------------------------------------------------------------------------------------")
        // console.log(req.body)
        // console.log("❌")
        // console.log(req.file)
        // console.log("---------------------------------------------------------------------------------------------------")
    }
    }
    // console.log("2")
    
}
})



exports.uploadSubCategoryImages = upload.single('image')


exports.resizeSubCategoryImages =async (req,res,next)=>{
    if(!req.file){
        console.log("hjkbbb");
        return next();
    }    
    console.log("1️⃣")
    let name="";
    if(!req.body.name){
        const subCategory=await SubCategory.findById(req.params.id);
        name=subCategory.name;
    }
    req.file.filename=`SubCategory-${name}-${Date.now()}.png`
    console.log("2️⃣",req.file.filename);
    await sharp(req.file.buffer).resize(500,500).toFormat('png').png({quality:90}).toFile(`public/subCategoryImages/${req.file.filename}`);
    console.log("3️⃣");
    
    next();
}


exports.getAllSubCategories = catchAsync (async (req,res,next)=>{
    const subCategories = await SubCategory.find();
    if(!subCategories) return next(new AppError("Oops, there is porblem retriving categories..",404))
    res.status(200).json({
        status: 'success',
        message: "Sub-categories retrieved successfully",
        "total categories":subCategories.length,
        data:{
            subCategories
        }
    })
})

exports.getSubCategory = catchAsync (async (req,res,next)=>{
    if(!req.params.id)  return next(new AppError("please provide id of category",404))
    const subCategory = await SubCategory.findById(req.params.id).populate('products');
    if(!subCategory) return next(new AppError("please provide a valid id of sub-category you are searching for..",404))
    res.status(200).json({
        status: 'success',
        message: "Sub-category retrieved successfully",
        data:{
            subCategory
        }
    })
})



exports.createSubCategory = catchAsync(async function name(req,res,next) {

    // const obj={
    //     image:req.file.filename,
    //     name:req.body.name,
    // }
    // console.log(obj);
    if(!req.body.name) return next(new AppError("please provide name of sub Category",404));
    const newSubCategory= (await SubCategory.create(req.body))
    if(!newSubCategory) return next(new AppError("there is error creating new sub category",404))
    res.status(201).json({
        status:"success",
        message:"SUb Category created successfully",
        data:{
            newSubCategory,
        }
    })
})


exports.updateSubCategory = catchAsync(async (req,res,next)=>{
    // console.log(req.body,"➕")
    // console.log(req.file,"❌")
    let obj={...req.body}
    if(!req.params.id)    return next(new AppError("please provide id of sub-category,you want to update",404))
    
    if(req.file){
        console.log(obj,"1️⃣");
    
        if(!req.file.filename)  return next(new AppError("please provide a image",404))
        obj.image=req.file.filename
        // obj.name=req.body.name
        console.log(obj,"🥲")
    }else{
        obj=req.body
    }
    
    const updatedSubCategory= await SubCategory.findByIdAndUpdate(req.params.id,obj,{
        new:true,
        runValidators:true
    })
    
    if(!updatedSubCategory)   return next(new AppError("please provide valid id of a category to be update",404))

    
    res.status(200).json({
        status:"success",
        message:"Sub category updated successfully",
        data:{
            data:updatedSubCategory
        }
    })
})




exports.addRemoveProducts = catchAsync(async (req,res,next)=>{
    console.log(req.params);
    console.log(req.body);
    if(!req.params.id)    return next(new AppError("please provide id of sub-category to update",404))

    if((req.body.action!=="add")&&(req.body.action!=='remove')) return next(new AppError(`only Add and Remove actions are valid`,404))
    
    if(req.body.action==='add'){
        if(req.body.data.length===0){
            return next(new AppError(`please provide products to add`,404))
        }
      const updatedCategory=await SubCategory.findByIdAndUpdate(req.params.id,
        { $addToSet: { products: { $each: req.body.data } } },
        {new:true,runValidators:true}
      )  
      console.log(updatedCategory)
      
      res.status(200).json({
        message:"updated successfully",
        data:{
            updatedCategory
        }
    })
      
    }else{
        if(req.body.data.length===0){
            return next(new AppError(`please provide products to remove`,404))
        }
        
        const updatedSubCategory=await SubCategory.findByIdAndUpdate(req.params.id,
            { $pull: { products: { $in: req.body.data } } },            {new:true,runValidators:true}
          )  
          console.log(updatedSubCategory)
          
          res.status(200).json({
            message:"updated successfully",
            data:{
                updatedSubCategory
            }
        })
    }

})

// exports.togglProductsaddRemoveProductsVisibility = catchAsync(async (req, res, next) => {
//     if(!req.body.id)    return next(new AppError("please provide id of sub category to update",404))
//     if((req.params.action)!="hide"&&((req.params.action)!="show")) return next(new AppError(`please check the {URl} again . There are only two parameters for this route --> 1). Hide 2) .Show`,404))
//     console.log(req.body);
//     console.log(req.params.action)
    
//     let action = "";
//     if(req.params.action=="hide"){
//         action=false;
//     }else{
//         action=true;
//     }
//     console.log(action,"3️⃣")
//     await SubCategory.findByIdAndUpdate(req.body.id, { active:action });
    
//     res.status(204).json({
//       status: 'success',
//       data: null
//     }); 
//   });

















// exports.createSubCategory = catchAsync(async function name(req,res,next) {
//     // console.log(req.file);
//     console.log(req.body.SubCategory);
//     const obj={
//         image:req.file.filename,
//         name:req.body.name,
//     }
//     console.log(obj);
//     const newSubCategory= (await SubCategory.create(req.body))
//     res.status(201).json({
//         status:"success",
//         message:"Category created successfully",
//         data:{
//             newSubCategory,
//         }
//     })
// })



