import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AddProduct from "./components/pages/addProduct/addProduct.jsx"
import Register from "./components/pages/register/register.jsx"
import Login from "./components/pages/login/login.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/pages/profile/profile.jsx';
import ProductPage from './components/pages/productPage/productPage.jsx';
import AdminPanel from './components/pages/adminPanel/adminPanel.jsx';
import { ReportProvider } from './components/modalWindows/ReportContext.jsx';
import { EditProductProvider } from './components/modalWindows/editProductContext.jsx';

import { ReportModal } from './components/modalWindows/ReportModal.jsx';
import { EditProductModal } from './components/modalWindows/editProductModal.jsx';
import './index.css'

// React монтується у елемент з id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
    <ReportProvider>
      <EditProductProvider>
        <ReportModal />
        <EditProductModal />
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/addProduct' element={<AddProduct />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/productPage/:id' element={<ProductPage />}/>
          <Route path='/adminPanel' element={<AdminPanel />}/>
        </Routes>
      </EditProductProvider>
    </ReportProvider>
    </BrowserRouter>
  </React.StrictMode>
);