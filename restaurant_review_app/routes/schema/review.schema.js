const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    restaurantId: String,
    review: String,
    reviewDate: {
        type: Date,
        default: Date.now,
    },
    owner: String,
}, {
    collection: 'reviews',
})

module.exports = ReviewSchema;