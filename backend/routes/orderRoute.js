const express = require('express');
const router=express.Router();
const orderController = require("../controllers/orderController")
const authController = require("../controllers/authController")

router.post("/checkout/sessions",authController.protect,orderController.getCheckOutSession).get("/checkout/sessions/:sessionId",orderController.getStripeSessionStatus);
// router.get("/checkout-session/:orderId",orderController.getCheckOutSession);



router
  .route("/")
  .get(authController.protect,orderController.getAllOrders)
  .post(authController.protect,orderController.createOrder);
  
router.route("/user/:userId").get(authController.protect,orderController.getAllOrdersByUser)
  router.route("/cancel-order/:id").patch(orderController.cancelOrder)
  router.route("/:id").get(orderController.getOrder).patch(orderController.updateOrder)
  router.route("/verifyDelivery/:id/code/:code").post(orderController.verifyDeliveryCode)
// router
//   .route("/:id")
//   .patch(
//     imageUploadHandler.uploadImages,
//     imageUploadHandler.findFilePath,
//     categoryController.resizeCategoryImages,
//     categoryController.updateCategory
//   )
//   .get(categoryController.getCategory);
// router.patch(
//   "/addRemoveSubcategory/:id",
//   categoryController.addRemoveSubcategory
// );


module.exports= router;