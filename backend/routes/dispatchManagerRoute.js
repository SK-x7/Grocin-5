const express = require("express");
const dispatchManagerAuthController = require("../controllers/dispatchManagerAuthController");
const dispatchManagerController = require("../controllers/dispatchManagerController");
const router = express.Router();

router.post("/signup", dispatchManagerAuthController.signUp);
// router.post(
// 	"/checkDuplicateEmail",
// 	dispatchManagerAuthController.
// );
router.post("/login", dispatchManagerAuthController.login);
router.post("/sendOtpEmail", dispatchManagerAuthController.sendOtpEmail);
router.post("/verifyOtpEmail", dispatchManagerAuthController.verifyOtp);
router.post("/forgotPassword", dispatchManagerAuthController.forgotPassword);
router.patch(
	"/resetPassword/:token",
	dispatchManagerAuthController.resetPassword
);

router.patch(
	"/updateMyPassword",
	dispatchManagerAuthController.protect,
	dispatchManagerAuthController.updatePassword
);
router.patch(
	"/updateMe",
	dispatchManagerAuthController.protect,
	dispatchManagerController.updateMe
);
router.delete(
	"/deleteMe",
	dispatchManagerAuthController.protect,
	dispatchManagerController.deleteMe
);

router.get(
	"/isLoggedIn",
	dispatchManagerAuthController.protect,
	dispatchManagerController.isLoggedIn
);
router.post(
	"/logout",
	dispatchManagerAuthController.protect,
	dispatchManagerController.logout
);

router
	.route("/")
	.get(dispatchManagerController.getAllUser)
	.post(dispatchManagerController.createUser);
    router.patch(
        "/assignDeliveryPartner",
        dispatchManagerAuthController.protect,
        dispatchManagerController.assignDeliveryPartner
    );
    
    router.get('/orders',dispatchManagerAuthController.protect, dispatchManagerController.getAllOrders);
    router
        .route("/:id")
        .get(dispatchManagerAuthController.protect, dispatchManagerController.getUser)
        .patch(
            dispatchManagerAuthController.protect,
            dispatchManagerController.updateUser
        );
module.exports = router;
