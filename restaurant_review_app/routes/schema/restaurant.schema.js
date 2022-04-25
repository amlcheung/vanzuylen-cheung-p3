const Schema = require('mongoose').Schema;

const RestaurantSchema = new Schema({
    title: String,
    name: String,
    cuisine: String,
    rating: Number,
    builtDate: {
        type: Date,
        default: Date.now,
    },
    owner: String,
}, {
    collection: 'restaurants',
})

module.exports = RestaurantSchema;