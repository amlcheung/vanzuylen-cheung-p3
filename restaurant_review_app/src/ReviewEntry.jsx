import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate} from 'react-router';

export default function ReviewEntry() {

    const navigate = useNavigate();
    const [reviewTitle, setReviewTitle] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [review, setReview] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [rating, setRating] = useState('');
    const [username, setUsername] = useState(null);


    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function createNewReview() {
        Axios.post('/api/review/', {reviewTitle, restaurant, review, cuisine, rating, username})
            .then(response => {
                navigate('/');
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h5>
                Review Title:
            </h5>
            <input value={reviewTitle} onChange={e => setReviewTitle(e.target.value)} />
            <h5>
                Restaurant:
            </h5>
            <input value={restaurant} onChange={e => setRestaurant(e.target.value)} />
            <h5>
                Review:
            </h5>
            <input value={review} onChange={e => setReview(e.target.value)} />
            <h5>
                Cuisine:
            </h5>
            <input value={cuisine} onChange={e => setCuisine(e.target.value)} />
            <h5>
                Rating:
            </h5>
            <input value={rating} onChange={e => setRating(e.target.value)} />
            <button onClick={createNewReview}>
                Submit
            </button>
        </div>

    )   
}
