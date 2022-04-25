const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    title: String,
    restaurantName: String,
    reviewBlob: String,
    cuisine: String,
    rating: Number,
    owner: String,
}, {
    collection: 'reviews',
})

module.exports = ReviewSchema;