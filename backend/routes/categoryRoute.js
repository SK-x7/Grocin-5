const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const subCategoryController = require("../controllers/subCategoryController");
const imageUploadHandler = require("../utils/imageFunctions")


router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);
router
  .route("/:id")
  .patch(
    imageUploadHandler.uploadImages,
    imageUploadHandler.findFilePath,
    categoryController.resizeCategoryImages,
    categoryController.updateCategory
  )
  .get(categoryController.getCategory);
router.patch(
  "/addRemoveSubcategory/:id",
  categoryController.addRemoveSubcategory
);
//category routes

// router.post('/',categoryController.createCategory).get(categoryController.getAllCategories);
// router.patch('/updateCategory',categoryController.uploadCategoryImages,subCategoryController.findFilePath,categoryController.resizeCategoryImages,categoryController.updateCategory);
// router.patch('/toggleCategoryVisibility/:action',categoryController.toggleCategoryVisibility)  //action -- hide/show

//action -- add/remove

//subcategories routes
// router.post('/createSubCategory',subCategoryController.createSubCategory);
// router.post('/updateSubCategory',subCategoryController.uploadSubCategoryImages,subCategoryController.findFilePath,subCategoryController.resizeSubCategoryImages,subCategoryController.updateSubCategory);
// router.patch('/*',subCategoryController.toggleSubCategoryVisibility)
//action -- hide/show
// router.post('/updateSubCategory',subCategoryController.uploadSubCategoryImages,subCategoryController.resizeSubCategoryImages,subCategoryController.updateSubCategory);

// router.post("/findFilePath",subCategoryController.findFilePath)

module.exports = router;
