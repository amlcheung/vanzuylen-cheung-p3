const express = require('express');
const RestaurantModel = require('./model/review.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();

// Gets all reviews
router.get('/', function(request, response) {
    return ReviewModel.getAllReviews()
        .then(allReviews => {
            response.status(200).send(allReviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

// Gets reviews for a restaurant
router.get('/:restaurantId', function(request, response) {

    const restaurantId = request.params.restaurantId

    return ReviewModel.getReviewsByResaurantId(restaurantId)
        .then(reviews => {
                response.status(200).send(reviews);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

// Get reviews written by an owner
router.get('/:owner', function(request, response) {

    const owner = request.params.owner

    return ReviewModel.getReviewByUsername(owner)
        .then(reviewsOwned => {
                response.status(200).send(reviewsOwned);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.post('/', auth_middleware, function(request, response) {
    const restaurantId = request.body.restaurantId;
    const review = request.body.review;
    const user = request.username;


    if (!restaurantId) {
        response.status(401).send("Missing Restaurant ID argument");
    } else if (!review) {
        response.status(401).send("Missing Review");
    } else if (!user) {
        response.status(401).send("Missing User argument");
    }

    const review = {
        restaurantId: restaurantId,
        review: review,
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