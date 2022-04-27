import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate} from 'react-router';

export default function ReviewEntry() {

    const navigate = useNavigate();
    const [restaurantName, setRestaurantName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [rating, setRating] = useState('');
    const [username, setUsername] = useState(null);


    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function createNewRestaurant() {
        Axios.post('/api/restaurant/', {restaurantName, cuisine, rating, username})
            .then(response => {
                navigate('/restaurant/' + response.data._id); // needs to navigate to the new restaurant page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h5>
                Restaurant Name:
            </h5>
            <input value={restaurantName} onChange={e => setRestaurantName(e.target.value)} />
            <h5>
                Cuisine:
            </h5>
            <input value={cuisine} onChange={e => setCuisine(e.target.value)} />
            <h5>
                Michelin Stars:
            </h5>
            <input value={rating} onChange={e => setRating(e.target.value)} />
            <button onClick={createNewRestaurant}>
                Submit
            </button>

        </div>

    )   
}
