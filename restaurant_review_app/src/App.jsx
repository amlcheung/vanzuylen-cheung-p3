import React, { useEffect, useState } from 'react';
import Axios from 'axios';


export default function App() {

  const [restaurants, setRestaurants] = useState([]);
  //const [newHomeInput, setNewHomeInput] = useState('');

  function getRestaurants() {
    Axios.get('/api/restaurant')
      .then(function(response) {
        setRestaurants(response.data);
      })
  }
  useEffect(getRestaurants, []);

  const restaurantComponent = [];
  for(let restaurant of restaurants) {
      restaurantComponent.push(<div>
      <a href={'/restaurant/' + restaurant._id}><h1>{restaurant.restaurantName}</h1></a>
      <h5>Cuisine: {restaurant.cuisine}</h5>
      </div>)

  }

  return (
    <div>Welcome To Restaurant Review App
      {restaurantComponent}
    </div>
  );
}
