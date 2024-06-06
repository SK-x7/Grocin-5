const multer = require("multer");

const fs = require("fs");
const path = require("path");

const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { Promise } = require("mongoose");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image please upload images", 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

function findImagePathByFilename(filename, uploadDirectory){
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

exports.findUrl=async (filename,uploadDirectory)=>{
  const url=findImagePathByFilename(filename,uploadDirectory);
  console.log(url,"12345");
  return url;
}

exports.findFilePath = catchAsync(async (req, res, next) => {
  console.log(req.originalUrl, "🧨");
  if (!req.file) {
    next();

    // console.log(req.url);
    // console.log(req.body);
    // console.log(req.file);
  } else {
    let uploadDirectory = "";
    let TobeUpdated = "";
    if (req.originalUrl.includes("subcategory")) {
      uploadDirectory = "public/subCategoryImages";
      // TobeUpdated="SubCategory"
      TobeUpdated = SubCategory;
    } else if (req.originalUrl.includes("category")) {
      uploadDirectory = "public/categoryImages";
      // TobeUpdated="Category"
      TobeUpdated = Category;
    } else if (req.originalUrl.includes("product")) {
      uploadDirectory = "public/productImages";
      TobeUpdated = Product;
      // TobeUpdated="Product"
    }

    if (!req.params.id)
      return next(new AppError(`please provide id of ${TobeUpdated}`));
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
    if (doc.image === undefined) {
      console.log(doc, "❌");

      next();
    } else {
      const imagePath = findImagePathByFilename(doc?.image, uploadDirectory);

      if (imagePath) {
        console.log("Image found at:", imagePath);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error removing old image:", err);
          } else {
            console.log("Old image removed successfully.");
          }
          next();
        });
      } else {
        console.log("Image not found.");

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
});

exports.uploadImages = upload.single("image");
