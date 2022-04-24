import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import './index.css';
import App from './App';
import NavBar from './NavBar';
// import RestaurantEntry from './RestaurantEntry';
// import Login from './Login';
import CreateUser from './CreateUser';

  ReactDOM.render(
   <div>
   <BrowserRouter>
    <NavBar />
     <Routes>
      <Route path={"/"} element={<App />}/>
      {/* <Route path={"/login"} element={<Login />} /> */}
      <Route path={"/createUser"} element={<CreateUser />} />
    </Routes>
   </BrowserRouter>
      
   </div>
 ,
   document.getElementById('root') );