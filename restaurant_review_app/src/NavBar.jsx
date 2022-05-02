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
            <div className="font-style-welcome">~ Restaurant Review App ~</div>
            <a href='/'><h1>Home</h1></a>
            <div className="logged-in">{username}</div>
            <button className="logout-button" onClick={logout}>Logout</button>
            <a href="/restaurantEntry/new"><h1>Create a Restaurant</h1></a>
        </div>)
    }

    return (
        <div className="nav-bar-container">
            <div className="font-style-welcome">~ Restaurant Review App ~</div>
             <a href='/'><h1>Home</h1></a>
             <a href='/login'><h1>Login</h1></a>
             <a href='/createUser'><h1>Create an Account</h1></a>
        </div>
    )

}