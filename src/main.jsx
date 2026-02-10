import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import AddProduct from "./components/pages/addProduct/addProduct.jsx"
import Register from "./components/pages/register/register.jsx"
import Login from "./components/pages/login/login.jsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/pages/profile/profile.jsx';
import ProductPage from './components/pages/productPage/productPage.jsx';
import AdminPanel from './components/pages/adminPanel/adminPanel.jsx';
import GeneralComments from './components/pages/generalComments.jsx';
import AboutSeedra from './components/pages/aboutSeedra.jsx';
import OurBlog from './components/pages/ourBlog.jsx';
import BlogPost from './components/pages/blogPost.jsx';
import Search from './components/pages/search.jsx';
import TermsConditions from './components/pages/termsContions.jsx';
import PrivacyPolicy from './components/pages/privacyPolicy.jsx';

import NotFound from './components/pages/notFound.jsx';
import { ReportProvider } from './components/modalWindows/ReportContext.jsx';
import { EditProductProvider } from './components/modalWindows/editProductByAdminContext.jsx';
import { BasketContextProvider } from './components/modalWindows/BasketContext.jsx';
import { EditProfileProvider } from './components/modalWindows/EditProfileContext.jsx';
import { ResultProvider } from './components/modalWindows/resultContext.jsx';
import { OrderContextProvider } from './components/modalWindows/OrderContext.jsx';
// import { EditProductByUserProvider } from './components/modalWindows/editProductByUserContext.jsx';

import { ReportModal } from './components/modalWindows/ReportModal.jsx';
import { EditProductModal } from './components/modalWindows/editProductByAdminModal.jsx';
import { BasketModal } from './components/modalWindows/BasketModal.jsx';
import { EditProfileModal } from './components/modalWindows/EditProfileModal.jsx';
import { ResultModal } from './components/modalWindows/resultModal.jsx';
import { OrderModal } from './components/modalWindows/OrderModal.jsx';
import { ScrollToHash } from './components/hooks/scrollToHash.jsx';

// import { EditProductByUserModal } from './components/modalWindows/editProductByUserModal.jsx';
import './index.css'
import TakeOrder from './components/pages/takeOrder.jsx';

// React монтується у елемент з id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
    <ReportProvider>
      <EditProductProvider>
        <BasketContextProvider>
          <OrderContextProvider>
            <EditProfileProvider>
              <ResultProvider>
                <ReportModal />
                <EditProductModal />
                <BasketModal />
                <EditProfileModal />
                <ResultModal />
                <OrderModal />
                <ScrollToHash />
                <Routes>
                  <Route path='/' element={<App />}/>
                  <Route path='/addProduct' element={<AddProduct />}/>
                  <Route path='/register' element={<Register />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/profile/:id' element={<Profile />}/>
                  <Route path='/productPage/:id' element={<ProductPage />}/>
                  <Route path='/adminPanel' element={<AdminPanel />}/>
                  <Route path='/generalComments' element={<GeneralComments />}/>
                  <Route path='/aboutSeedra' element={<AboutSeedra />}/>
                  <Route path='/ourBlog' element={<OurBlog />}/>
                  <Route path="/blogPost/:id" element={<BlogPost />}/>
                  <Route path="/search" element={<Search />}/>
                  <Route path='/termsConditions' element={<TermsConditions />}/>
                  <Route path='/privacyPolicy' element={<PrivacyPolicy />}/>
                  <Route path='/takeOrder/:id' element={<TakeOrder />}/>

                  {/* 404 */}
                  <Route path='*' element={<NotFound />}/>
                </Routes>
              </ResultProvider>
            </EditProfileProvider>
          </OrderContextProvider>
        </BasketContextProvider>
      </EditProductProvider>
    </ReportProvider>
    </BrowserRouter>
  </React.StrictMode>
);