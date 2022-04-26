const mongoose = require('mongoose');

const RestaurantSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function getReviewByUsername(username) {
    return ReviewModel.find({
        owner: username
    }).exec();
}

function getAllReviews() {
    return ReviewModel.find().exec();
}

function getReviewByRestaurantId(RestaurantId) {
    return ReviewModel.find({
        RestaurantId: RestaurantId
    }).exec();
}

module.exports = {
    createReview,
    getReviewByUsername,
    getAllReviews,
    getReviewByRestaurantId,
}