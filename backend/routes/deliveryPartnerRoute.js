const express = require("express");
const router = express.Router();
const deliveryPartnerAuthController = require("../controllers/deliveryPartnerAuthController");
const deliveryPartnerController = require("../controllers/deliveryPartnerController");

router.post("/signup", deliveryPartnerAuthController.signUp);
router.post(
    "/checkDuplicateEmail",
    deliveryPartnerController.checkDuplicateEmail
);
router.post("/login", deliveryPartnerAuthController.login);
router.post("/sendOtpEmail", deliveryPartnerAuthController.sendOtpEmail);
router.post("/verifyOtpEmail", deliveryPartnerAuthController.verifyOtp);
router.post("/forgotPassword", deliveryPartnerAuthController.forgotPassword);
router.patch(
    "/resetPassword/:token",
    deliveryPartnerAuthController.resetPassword
);

router.patch(
    "/updateMyPassword",
    deliveryPartnerAuthController.protect,
    deliveryPartnerAuthController.updatePassword
);
router.patch(
    "/updateMe",
    deliveryPartnerAuthController.protect,
    deliveryPartnerController.updateMe
);
router.delete(
    "/deleteMe",
    deliveryPartnerAuthController.protect,
    deliveryPartnerController.deleteMe
);

router.get(
    "/isLoggedIn",
    deliveryPartnerAuthController.protect,
    deliveryPartnerController.isLoggedIn
);
router.post(
    "/logout",
    deliveryPartnerAuthController.protect,
    deliveryPartnerController.logout
);

router.get('/assignedOrders',deliveryPartnerAuthController.protect, deliveryPartnerController.getAssignedOrders);
router.patch('/update-status',deliveryPartnerAuthController.protect, deliveryPartnerController.changeStatus);
router
    .route("/")
    .get(deliveryPartnerController.getAllUser)
    .post(deliveryPartnerController.createUser);
router
    .route("/:id")
    .get(deliveryPartnerAuthController.protect, deliveryPartnerController.getUser)
    .patch(
        deliveryPartnerAuthController.protect,
        deliveryPartnerController.updateUser
    );


module.exports = router;
