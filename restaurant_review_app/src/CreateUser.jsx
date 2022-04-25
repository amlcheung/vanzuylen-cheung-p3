import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';

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
<<<<<<< HEAD
=======
                navigate(0); // refreshes the page

>>>>>>> f819084905e4a428e253004e27fa20f1f81f9c65
            })
            .catch(error => console.log(error));
    }


    return (
        <div>
            <h1>Create User</h1>
            <h5>
                Username
            </h5>
            <input value={username} onChange={e => setUsername(e.target.value)} />
            <h5>
                Password
            </h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={createNewUser}>
                Login with New User
            </button>
        </div>

    )


} 