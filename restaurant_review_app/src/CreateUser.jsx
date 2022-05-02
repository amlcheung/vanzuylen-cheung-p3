import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.css';

export default function CreateUser(props) {


    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function createNewUser() {
        Axios.post('/api/user/', {username, password})
            .then(response => {
                console.log("Created user");
                console.log(response.data);
                navigate('/');
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }


    return (
        <div>
            <div className="header">Create a new Account</div>
            <div className="font-style-loggin">
                <div>
                    Username
                </div>
                <input className="input-box" value={username} onChange={e => setUsername(e.target.value)} />
                <div>
                    Password
                </div>
                <input className="input-box" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className="new-user-loggin-button" onClick={createNewUser}>
                    Create Your Account
                </button>
            </div>
        </div>

    )


} 