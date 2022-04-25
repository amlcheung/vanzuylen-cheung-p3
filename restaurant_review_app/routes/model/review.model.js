const mongoose = require('mongoose');

const ReviewSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewModel);

function createReview(review) {
    return ReviewModel.create(review);
}

function getReviewByUsername(username) {
    return ReviewModel.find({
        owner: username
    }).exec();
}

funct

function getAllReviews() {
    return ReviewModel.find().exec();
}

module.exports = {
    createReview,
    getReviewByName,
    getAllReviews,
}
