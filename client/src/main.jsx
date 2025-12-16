import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AddProduct from "./components/pages/addProduct/addProduct.jsx"
import Register from "./components/pages/register/register.jsx"
import Login from "./components/pages/login/login.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/pages/profile/profile.jsx';
import ProductPage from './components/pages/productPage/productPage.jsx';

// React монтується у елемент з id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/addProduct' element={<AddProduct />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/productPage/:id' element={<ProductPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);