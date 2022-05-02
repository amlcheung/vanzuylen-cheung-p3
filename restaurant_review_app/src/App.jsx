import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

export default function App() {

  const [restaurants, setRestaurants] = useState([]);
  //const [newHomeInput, setNewHomeInput] = useState('');

  function getRestaurants() {
    Axios.get('/api/restaurant/')
      .then(function(response) {
        setRestaurants(response.data);
      })
  }
  useEffect(getRestaurants, []);
  console.log(restaurants);

  const restaurantComponent = [];
  console.log(restaurantComponent);
  for(let restaurant of restaurants) {
    console.log(restaurant);
    restaurantComponent.push(<div>
      <a href={'/restaurant/' + restaurant._id}><div className="restaurant-name">{restaurant.name}</div></a>
      <div className="attribute-name">Cuisine: {restaurant.cuisine}</div>
      <div className="attribute-name review-spacing">Michilen Stars: {restaurant.rating}</div>
      </div>)

  }

  return (
    <body>
        <div className="font-style-restaurants">
          {restaurantComponent}
        </div>
    </body>
  );
}
