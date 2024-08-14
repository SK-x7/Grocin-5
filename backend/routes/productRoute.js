const express = require("express");
const productController = require("../controllers/productController");
const subCategoryController = require("../controllers/subCategoryController");
const imageUploadHandler = require("../utils/imageFunctions");

const router = express.Router();

// test
router.get("/test", (req, res, next) => {
  res.status(200).json({
    status: "ok",
    message:
      "Everything fine with routing . if you encounter any problem after this in products routes that means there is problem with controllers",
  });
});

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch( 
    imageUploadHandler.uploadImages,
    imageUploadHandler.findFilePath,
    productController.resizeProductImages,
    productController.updateProduct
  );

router.route("/uploadProductImage").patch(imageUploadHandler.uploadImages)
router.route("/searchProduct/search").get(productController.searchProduct);
  
module.exports = router;
