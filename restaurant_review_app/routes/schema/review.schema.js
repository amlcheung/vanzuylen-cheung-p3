const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    Title: String,
    RestaurantName: String,
    reviewBlob: String,
    cuisine: String,
    Rating: Number,
    owner: String,
}, {
    collection: 'reviews',
})

module.exports = ReviewSchema;