import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate} from 'react-router';

export default function ReviewEntry() {

    const navigate = useNavigate();
    const [restaurantName, setRestaurantName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [rating, setRating] = useState('');
    const [username, setUsername] = useState(null);
    const params = useParams();


    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

     // Gets the restaurant and sets the restaurant Id
     useEffect(function() {
        const restaurantInput = document.getElementById('restaurant');
        const cuisineInput = document.getElementById('cuisine');
        const ratingInput = document.getElementById('rating');
         if (params.restaurantId == 'new'){
            restaurantInput.value = '';
            cuisineInput.value = '';
            ratingInput.value = '';
         } else {
            Axios.get('/api/restaurant/' + params.restaurantId)
            .then(response =>{
                restaurantInput.value = response.data.name
                setRestaurantName(response.data.name)
                cuisineInput.value = response.data.cuisine
                setCuisine(response.data.cuisine)
                ratingInput.value = response.data.rating
                setRating(response.data.rating)
            })
            .catch(error => {console.log(error)});
         }
    },[]);

    // Creates a new restaurant
    function createNewRestaurant() {
        Axios.post('/api/restaurant/', {restaurantName, cuisine, rating, username})
            .then(response => {
                console.log(response)
                navigate('/restaurant/' + response.data._id); // needs to navigate to the new restaurant page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    // Updates the restaurant
    function updateRestaurant() {
        const restaurantId = params.restaurantId;
        Axios.put('/api/restaurant/', {restaurantId, restaurantName, cuisine, rating, username})
            .then(response => {
                //console.log(response)
                navigate('/restaurant/' + restaurantId); // needs to navigate to the new restaurant page
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    if (params.restaurantId == 'new'){
    // if the restaurant is new, then create a new restaurant when the buttom is submitted    
    return (
        <div>
            <h5>
                Restaurant Name:
            </h5>
            <input id = 'restaurant' value={restaurantName} onChange={e => setRestaurantName(e.target.value)} />
            <h5>
                Cuisine:
            </h5>
            <input id = 'cuisine' value={cuisine} onChange={e => setCuisine(e.target.value)} />
            <h5>
                Michelin Stars:
            </h5>
            <input id = 'rating' value={rating} onChange={e => setRating(e.target.value)} />
            <button onClick={createNewRestaurant}>
                Submit
            </button>

        </div>

    )  
    } else {
        // if the restaurant is being edited, then update the restaurant when the button is submitted
        return (
            <div>
                <h5>
                    Restaurant Name:
                </h5>
                <input id = 'restaurant' value={restaurantName} onChange={e => setRestaurantName(e.target.value)} />
                <h5>
                    Cuisine:
                </h5>
                <input id = 'cuisine' value={cuisine} onChange={e => setCuisine(e.target.value)} />
                <h5>
                    Michelin Stars:
                </h5>
                <input id = 'rating' value={rating} onChange={e => setRating(e.target.value)} />
                <button onClick={updateRestaurant}>
                    Submit
                </button>
    
            </div>
    
        )  
    }
}
