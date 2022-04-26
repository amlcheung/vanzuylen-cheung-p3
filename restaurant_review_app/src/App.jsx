import React, { useEffect, useState } from 'react';
import Axios from 'axios';


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
      <a href={'/' + restaurant._id}><h1>{restaurant.name}</h1></a>
      <h5>Cuisine: {restaurant.cuisine}</h5>
      <h5>Michilen Stars: {restaurant.rating}</h5>
      </div>)

  }

  return (
    <div>Welcome To Restaurant Review App
      {restaurantComponent}
    </div>
  );
}
