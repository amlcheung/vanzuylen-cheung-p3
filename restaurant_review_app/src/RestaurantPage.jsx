import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function RestaurantPage(props) {

    const [restaurant, setRestaurant] = useState(undefined);
    const [username, setUsername] = useState(null);
    const [review, setReview] = useState(null);

    const params = useParams();
    console.log("params");

    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    useEffect(() => {
        Axios.get('/api/restaurant/' + params.restaurantId)
            .then(function(response) {
            setRestaurant(response.data);
            })
    },[]);

    function createReview() {
        Axios.post('/api/review/', {username, restaurant, review})
            .then(response => {
                console.log("Created Review");
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }

    if (!restaurant) {
        return (<div>
            Restaurant loading...
        </div>)
    }

    if (username) {
        return ( 
        <div>
            <h1>
                Restaurant: {restaurant.name} 
            </h1>
            <h2>
                Cuisine: {restaurant.cuisine}
            </h2>
            <h2>
                Michilen Stars: {restaurant.rating}
            </h2>
            <h5>
                Review this Restaurant:
            </h5>
            <input value={review} onChange={e => setReview(e.target.value)} />
            <button onClick={createReview}>
                Submit Review
            </button>
        </div>
        )
    }

    return (
        <div>
            <h1>
                Restaurant: {restaurant.name} 
            </h1>
            <h2>
                Cuisine: {restaurant.cuisine}
            </h2>
            <h2>
                Michilen Statrs: {restaurant.rating}
            </h2>

        </div>
    )

}