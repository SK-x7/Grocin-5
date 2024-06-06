const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.route('/test').get((req,res,next)=>{
    // console.log(req.user);
    res.status(200).json({
        status:"success",
        message:"Everything good with review route .if you encounter problem after this with routing then check the url again"
    })
})

router.route('/').get(reviewController.getAllReviews).post(reviewController.setTourUserIds,reviewController.createReview);
router.route('/:id').get(reviewController.getReview).patch(reviewController.updateReview).delete(reviewController.deleteReview)

// router
//   .route('/:id')
//   .get(reviewController.getReview)
//   .patch(
//     authController.restrictTo('user', 'admin'),
//     reviewController.updateReview
//   )
//   .delete(
//     authController.restrictTo('user', 'admin'),
//     reviewController.deleteReview
//   );


module.exports =router;