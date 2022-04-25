const express = require('express');

const ReviewModel = require('./model/review.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();


router.get('/', auth_middleware, function(request, response) {

    const username = request.username;

    return ReviewModel.getReviewsByUsername(username)
        .then(allReviews => {
            response.status(200).send(allReviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/:reviewId', function(request, response) {

    const reviewId = request.params.reviewId

    return ReviewModel.getReviewById(reviewId)
        .then(review => {
                response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})


router.post('/', auth_middleware, function(request, response) {
    const reviewTitle = request.body.reviewTitle;
    const restaurantReview = request.body.review;
    const restaurantCuisine = request.body.cuisine;
    const restaurantRating = request.body.rating;
    const restaurantName = request.body.restaurant;
    const user = request.body.username;

    if (!reviewTitle) {
        response.status(401).send("Missing Review Title argument");
    } else if (!restaurantReview) {
        response.status(401).send("Missing Restaurant Review argument");
    } else if (!restaurantCuisine) {
        response.status(401).send("Missing Cuisine argument");
    } else if (!restaurantRating) {
        response.status(401).send("Missing Rating argument");
    } else if (!restaurantName) {
        response.status(401).send("Missing Restaurant name argument");
    }

    const review = {
        title: reviewTitle,
        restaurantName: restaurantName,
        reviewBlob: restaurantReview,
        cuisine: restaurantCuisine,
        rating: restaurantRating,
        owner: user,
    }

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;