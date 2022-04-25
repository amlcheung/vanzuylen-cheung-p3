const express = require('express');

const ReviewModel = require('./model/review.model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');
const router = express.Router();


router.get('/', auth_middleware, function(request, response) {

    const username = request.username;

    return HomeModel.getHomesByUsername(username)
        .then(allHomes => {
            response.status(200).send(allHomes)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

router.get('/:reviewTitle', function(request, response) {

    const homeId = request.params.homeId

    return HomeModel.getHomeById(homeId)
        .then(home => {
                response.status(200).send(home);
        })
        .catch(error => {
            response.status(400).send(error);
        })
})