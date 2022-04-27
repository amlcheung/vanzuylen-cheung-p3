import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function RestaurantPage(props) {

    const [restaurant, setRestaurant] = useState(undefined);
    const [restaurantId, setRestaurantId] = useState(undefined);
    const [username, setUsername] = useState(null);
    const [review, setReview] = useState(null);
    const [allReviews, setAllReviews] = useState([]);
    const params = useParams();

    // Checks if user is logged in 
    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    // Gets the restaurant and sets the restaurant Id
    useEffect(function() {
        Axios.get('/api/restaurant/' + params.restaurantId)
            .then(response => setRestaurant(response.data))
            .catch(error => console.log(error));
        setRestaurantId(params.restaurantId);
    },[]);

    // Creates a new review
    function createReview() {
        Axios.post('/api/review/', {username, restaurantId, review})
            .then(response => {
                console.log("Created Review");
                console.log(response.data);
            })
            .catch(error => console.log(error));
            //setReview("");
        const reviewInput = document.getElementById('theReview');
        reviewInput.value = '';
        getReviewsForRestaurant();
    }

    // Deletes a review
    function deleteReview(reviewId) {
        //console.log(reviewId);
        Axios.delete('/api/review/'+ reviewId)
            .then(response => {
                console.log("Deleted Review");
                console.log(response.data);
            })
            .catch(error => console.log(error));
        getReviewsForRestaurant();
    }

    // Gets reviews for a specific restaurant
    function getReviewsForRestaurant() {
        Axios.get('/api/review/' + params.restaurantId)
        .then(function(response) {
            setAllReviews(response.data)
        })
        .catch(error => console.log(error));
    }
    getReviewsForRestaurant()
    //useEffect(() => getReviewsForRestaurant(), [])
    // Creates the review Compnent
    const reviewComponent = [];
    for (let review of allReviews) {
        if (review.owner === username){
            reviewComponent.push(<div>
                <h5>Date: {review.reviewDate}</h5>
                <h5>{review.review}</h5>
                <h5>User: {review.owner}</h5>
                <h5>Restaurant Id: {review.restaurantId}</h5>
                <button id = "delete" onClick={()=>deleteReview(review._id)}>Delete this Review</button>
            </div>)
        } else {
        reviewComponent.push(<div>
            <h5>Date: {review.reviewDate}</h5>
            <h5>{review.review}</h5>
            <h5>User: {review.owner}</h5>
            <h5>Restaurant Id: {review.restaurantId}</h5>
        </div>)
        }
    }


    if (!restaurant) {
        return (<div>
            Restaurant loading...
        </div>)
    }

    // if logged in, return this
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
            <h2>
               ID: {restaurant._id}
            </h2>
            <h5>
                Review this Restaurant:
            </h5>
            <textarea id= "theReview" rows = "10" cols = "60" onChange={e => setReview(e.target.value)}></textarea>
            <button id = "create" onClick={createReview}>
                Submit Review
            </button>
            {reviewComponent}
        </div>
        )

        
    }

    // if not logged in 
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
            <h2>
               ID: {restaurant._id}
            </h2>
            {reviewComponent}

        </div>
    )

}