import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import './NavBar.css';

export default function NavBar(props) {

    const [username, setUsername] = useState(null);

    const navigate = useNavigate();

    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => setUsername(response.data.username))
            .catch(error => console.log("User is not logged in"));
    }, [])

    function logout() {
        Axios.post('/api/user/logout')
        .then(response => {
            navigate('/'); // sending it back to the home page and then reload the page
            navigate(0); // refreshing the whole page
        })
        .catch(error => console.log("Error logging out"));
    }

    if (username) {
        return (<div className="nav-bar-container">
            <div className="font-style-welcome">restaurant reviews</div>
            <a href='/'><h1>home</h1></a>
            <a href="/restaurantEntry/new"><h1>new restaurant</h1></a>
            <div className="logged-in">hi, {username}!</div>
            <button className="nav-button" onClick={logout}>logout</button>
        </div>)
    }

    return (
        <div className="nav-bar-container">
            <div className="font-style-welcome">restaurant review</div>
             <a href='/'><h1>home</h1></a>
             <a href='/login'><h1>login</h1></a>
             <a href='/createUser'><h1>create account</h1></a>
        </div>
    )

}