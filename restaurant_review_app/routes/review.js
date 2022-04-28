const express = require('express');
const ReviewModel = require('./model/review.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const { get } = require('./user');
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

    const restaurantId = request.params.restaurantId;

    return ReviewModel.getReviewByRestaurantId(restaurantId)
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

router.get('/:reviewId', function(request, response){
    const reviewId = request.params.reviewId;
    return ReviewModel.getReview(reviewId)
    .then(getReview =>{
        response.status(200).send("here")
    }).catch(error => {
        response.status(400).send(error);
    })

})

router.post('/', auth_middleware, function(request, response) {
    const restaurantId = request.body.restaurantId;
    const thisReview = request.body.review;
    const user = request.username;
    console.log(restaurantId);
    console.log(thisReview);
    console.log(user);

    if (!restaurantId) {
        response.status(401).send("Missing Restaurant ID argument");
    } else if (!thisReview) {
        response.status(401).send("Missing Review");
    } else if (!user) {
        response.status(401).send("Missing User argument");
    }

    const review = {
        restaurantId: restaurantId,
        review: thisReview,
        owner: user,
    }

    console.log(review);

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

// update a the review attribute of a review
router.put('/:reviewId', function(request, response) {
    const newReview = request.body.review;
    const id = request.params.reviewId;
    return ReviewModel.updateReviewByReviewId(id, newReview)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error);
        })
});


// Delete one review
router.delete('/:reviewId', function(request, response) {

    const reviewToDelete = request.params.reviewId

    return ReviewModel.deleteReviewByReviewId(reviewToDelete)
        .then(reviewDeleted => {
                response.status(200).send(reviewDeleted);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

// Delete all reviews from a restaurant
router.delete('/:restaurantId', function(request, response) {

    const restaurantId = request.params.restaurantId

    return ReviewModel.deleteReviewByRestaurantId(restaurantId)
        .then(reviewsDeleted => {
                response.status(200).send(reviewsDeleted);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})



module.exports = router;