const multer = require("multer")
const sharp = require("sharp");
const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

// const multerStorage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/categoryImages")
//     },
//     filename:(req,file,cb)=>{
//         console.log(req);
//         const ext = file.mimetype.split('/')[1];
//         cb(null,`category-${req.body.name}-${Date.now()}.${ext}`);
        
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




exports.uploadCategoryImages = upload.single('image')

exports.resizeCategoryImages = catchAsync(async(req,res,next)=>{
    // console.log(req.body,"🥲")
    // console.log(req.file,"🫡")
    if(!req.file)   return next();
    console.log("1️")
    if(!req.body.name){
        // console.log("£££££££££")
        const category=await Category.findById(req.params.id);
        // name=product.name;
        // console.log(category,"££££££££")
        req.file.filename=`Category-${category.name}-${Date.now()}.jpeg`
    }else{
        req.file.filename=`Category-${req.body.name}-${Date.now()}.jpeg`
    }
    console.log("2️⃣",req.file.filename);
    sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`public/categoryImages/${req.file.filename}`);
    console.log("3️⃣");
    
    next();
})


exports.getAllCategories = catchAsync (async (req,res,next)=>{
    const categories = await Category.find().populate('subcategories');
    if(!categories) return next(new AppError("Oops, there is porblem retriving categories..",404))
    res.status(200).json({
        status: 'success',
        message: "categories retrieved successfully",
        "total categories":categories.length,
        data:{
            categories
        }
    })
})




exports.getCategory = catchAsync (async (req,res,next)=>{
    if(!req.params.id)  return next(new AppError("please provide id of category",404))
    const category = await Category.findById(req.params.id).populate('subcategories');
    if(!category) return next(new AppError("please provide a valid id of category you are searching for..",404))
    res.status(200).json({
        status: 'success',
        message: "category retrieved successfully",
        data:{
            category
        }
    })
})


exports.createCategory = catchAsync(async function name(req,res,next) {

    // const obj={
    //     image:req.file.filename,
    //     name:req.body.name,
    // }
    // console.log(obj);
    if(!req.body.name) return next(new AppError("please provide name of sub Category",404));

    const newCategory= (await Category.create(req.body))
    if(!newCategory) return next(new AppError("there is error creating new category",404))

    res.status(201).json({
        status:"success",
        message:"Category created successfully",
        data:{
            newCategory,
        }
    })
})

exports.updateCategory = catchAsync(async (req,res,next)=>{
    
    // console.log(req.body,"➕")
    // console.log(req.file,"❌")
    let obj={...req.body}
    if(!req.params.id)    return next(new AppError("please provide id of category,you want to update",404))


    if(req.file){
        console.log(obj,"1️⃣");
    
        if(!req.file.filename)  return next(new AppError("please provide a image",404))
        obj.image=req.file.filename
        // obj.name=req.body.name
        console.log(obj,"🥲")
    }else{
        obj=req.body
    }
    
    const updatedCategory= await Category.findByIdAndUpdate(req.params.id,obj,{
        new:true,
        runValidators:true
    })
    
    if(!updatedCategory)   return next(new AppError("please provide valid id of a category to update",404))
    
    res.status(200).json({
        status:"success",
        message:"Category updated successfully",
        data:{
            data:updatedCategory
        }
    })
})

exports.addRemoveSubcategory = catchAsync(async (req,res,next)=>{
    console.log(req.params);
    console.log(req.body);
    if(!req.params.id)    return next(new AppError("please provide id of category to update",404))

    if((req.body.action!=="add")&&(req.body.action!=='remove')) return next(new AppError(`only Add and Remove actions are valid`,404))
    
    if(req.body.action==='add'){
        if(req.body.data.length===0){
            return next(new AppError(`please provide sub categories to add`,404))
        }
      const updatedCategory=await Category.findByIdAndUpdate(req.params.id,
        { $addToSet: { subcategories: { $each: req.body.data } } },
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
            return next(new AppError(`please provide sub categories to remove`,404))
        }
        
        const updatedCategory=await Category.findByIdAndUpdate(req.params.id,
            { $pull: { subcategories: { $in: req.body.data } } },            {new:true,runValidators:true}
          )  
          console.log(updatedCategory)
          
          res.status(200).json({
            message:"updated successfully",
            data:{
                updatedCategory
            }
        })
    }

})


  


