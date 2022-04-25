const express = require('express');
const RestaurantModel = require('./model/restaurant.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();


router.get('/', auth_middleware, function(request, response) {

    const username = request.username;

    return RestaurantModel.getReviewsByUsername(username)
        .then(allRestaurants => {
            response.status(200).send(allRestaurants)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/:restaurantId', function(request, response) {

    const restaurantId = request.params.restaurantId

    return RestaurantModel.getReviewById(restaurantId)
        .then(restaurant => {
                response.status(200).send(restaurant);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

router.post('/', auth_middleware, function(request, response) {
    const restaurantName = request.body.restaurantName;
    const restaurantCuisine = request.body.cuisine;
    const restaurantRating = request.body.rating;
    const user = request.username;

    if (!restaurantName) {
        response.status(401).send("Missing Restaurant name argument");
    } else if (!restaurantCuisine) {
        response.status(401).send("Missing Cuisine argument");
    } else if (!restaurantRating) {
        response.status(401).send("Missing Rating argument");
    }

    const restaurant = {
        restaurantName: restaurantName,
        cuisine: restaurantCuisine,
        rating: restaurantRating,
        owner: user,
    }

    return RestaurantModel.createRestaurant(restaurant)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;