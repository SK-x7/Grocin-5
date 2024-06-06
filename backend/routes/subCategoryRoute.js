const express = require("express");
const router = express.Router();

const subCategoryController = require("../controllers/subCategoryController");
const imageUploadHandler = require("../utils/imageFunctions")

router
  .route("/")
  .get(subCategoryController.getAllSubCategories)
  .post(subCategoryController.createSubCategory);
router
  .route("/:id")
  .get(subCategoryController.getSubCategory)
  .post(subCategoryController.createSubCategory)
  .patch(
    imageUploadHandler.uploadImages,
    imageUploadHandler.findFilePath,
    subCategoryController.resizeSubCategoryImages,
    subCategoryController.updateSubCategory
  );

router.patch(
    "/addRemoveProducts/:id",
    subCategoryController.addRemoveProducts
  );
//category routes

// router.post('/',categoryController.createCategory).get(categoryController.getAllCategories);
// router.patch('/updateCategory',categoryController.uploadCategoryImages,subCategoryController.findFilePath,categoryController.resizeCategoryImages,categoryController.updateCategory);
// router.patch('/toggleCategoryVisibility/:action',categoryController.toggleCategoryVisibility)  //action -- hide/show

// router.route('/').get(categoryController.getAllCategories).post(categoryController.createCategory)
// router.route('/:id').patch(categoryController.uploadCategoryImages,subCategoryController.findFilePath,categoryController.resizeCategoryImages,categoryController.updateCategory).get(categoryController.getCategory);
// router.patch('/addRemoveSubcategory/:id',categoryController.addRemoveSubcategory);
//action -- add/remove

//subcategories routes

// router.post('/createSubCategory',subCategoryController.createSubCategory);
// router.post('/updateSubCategory',subCategoryController.uploadSubCategoryImages,subCategoryController.findFilePath,subCategoryController.resizeSubCategoryImages,subCategoryController.updateSubCategory);
// router.patch('/*',subCategoryController.toggleSubCategoryVisibility)  //action -- hide/show
// router.post('/updateSubCategory',subCategoryController.uploadSubCategoryImages,subCategoryController.resizeSubCategoryImages,subCategoryController.updateSubCategory);

//test route
router.post("/findFilePath", subCategoryController.findFilePath);

module.exports = router;
