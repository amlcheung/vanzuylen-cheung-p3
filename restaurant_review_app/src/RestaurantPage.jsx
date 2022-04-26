import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// http://localhost:3000/home/625fcade9c10f6ba1d10faeb
export default function RestaurantPage(props) {

    const [restaurant, setRestaurant] = useState(undefined);
    const params = useParams();
    console.log("params");

    useEffect(() => {
        Axios.get('/api/restaurant/' + params.restaurantId)
            .then(function(response) {
            setRestaurant(response.data);
            })
    },[]);

    if (!restaurant) {
        return (<div>
            Restaurant loading...
        </div>)
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