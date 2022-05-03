import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.css';

export default function Login(props) {


    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function createNewUser() {
        Axios.post('/api/user/authenticate', {username, password})
            .then(response => {
                navigate('/');
                navigate(0); // refreshes the page
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="font-style-loggin">
            <div className="header">login</div>
            <div>
                username
            </div>
            <input className="input-box" value={username} onChange={e => setUsername(e.target.value)} />
            <div>
                password
            </div>
            <input className="input-box" type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button className="submit" onClick={createNewUser}>
                login
            </button>
        </div>

    )


} 