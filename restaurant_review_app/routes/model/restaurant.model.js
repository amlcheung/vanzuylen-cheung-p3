const mongoose = require('mongoose');

const RestaurantSchema = require('../schema/restaurant.schema');

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

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

module.exports = {
    createRestaurant,
    getRestaurantByUsername,
    getAllRestaurants,
    getRestaurantById,
    getRestaurantByName,
}

