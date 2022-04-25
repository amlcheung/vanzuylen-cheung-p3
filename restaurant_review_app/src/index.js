import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import NavBar from './NavBar';
import Login from './Login';
import CreateUser from './CreateUser';
import ReviewEntry from './ReviewEntry';

  ReactDOM.render(
   <div>
   <BrowserRouter>
    <NavBar />
     <Routes>
      <Route path={"/"} element={<App />}/>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/createUser"} element={<CreateUser />} />
      <Route path={"/restaurantEntry"} element={<ReviewEntry />}/>
    </Routes>
   </BrowserRouter>
      
   </div>
 ,
   document.getElementById('root') );