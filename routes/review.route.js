const reviewController = require("../controllers/review.controller");
const express = require('express');
const verifyJWT = require("../middleware/verifyToken");
const reviewRoute = express.Router();

reviewRoute.route('/')
    .get(reviewController.getReviews)
    .post(verifyJWT, reviewController.createReview)

module.exports = reviewRoute;