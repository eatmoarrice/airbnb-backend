var express = require('express');
var router = express.Router();
const { getReviewList, createReview, updateReview, deleteReview } = require("../controllers/reviewController")
const { requiresLogin } = require("../services/authenticationServiec");


router.route("/reviews")
    .get(getReviewList)
    .post(requiresLogin, createReview)
router.route("/reviews/:reviewId")
    .put(requiresLogin, updateReview)
    .delete(requiresLogin, deleteReview);

module.exports = router;