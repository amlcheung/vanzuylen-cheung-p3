const mongoose = require('mongoose');

const RestaurantSchema = require('../schema/restaurant.schema');
const ReviewSchema = require('../schema/review.schema');

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
// const ReviewModel = mongoose.model("Review", ReviewSchema);

function createRestaurant(restaurant) {
    return RestaurantModel.create(restaurant);
}

function getRestaurantByUsername(username) {
    return RestaurantModel.find({
        owner: username
    }).exec();
}

function getAllRestaurants() {
    return RestaurantModel.find().exec();
}

function getRestaurantById(id) {
    return RestaurantModel.findById(id).exec();
}
function getRestaurantByName(name) {
    return RestaurantModel.find({
        name: name
    }).exec();
}

function updateRestaurantByRestaurantId(id, updatedName, updatedCuisine, updatedRating, updatedUser) {
    return RestaurantModel.findByIdAndUpdate(id, {
        "$set": {"name": updatedName, "cuisine": updatedCuisine, "rating": updatedRating, "owner": updatedUser}}
        ).exec();
}

// Deleted restaurant using the restaurant id
function deleteRestaurant(id) {
    return RestaurantModel.findByIdAndDelete(id).exec();
}

module.exports = {
    createRestaurant,
    getRestaurantByUsername,
    getAllRestaurants,
    getRestaurantById,
    getRestaurantByName,
    updateRestaurantByRestaurantId,
    deleteRestaurant,

}

