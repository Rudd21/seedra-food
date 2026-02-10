import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Banner from "./components/banner/banner"
import Catalog from "./components/catalog/catalog"
import Feedback from "./components/feedbacks/feedbacks"
import Footer from "./components/footer"
import OurBlog from './components/ourBlog/ourBlog';
import {ReportModal} from './components/modalWindows/ReportModal';
import { apiRequest } from './serverRequest';

const App=()=> {
  
  useEffect(()=>{
    const init = async () =>{
      try{
        await axios.get(`${apiRequest}/createGuestSession`, {withCredentials: true})
        await axios.get(`${apiRequest}/user-data`, {withCredentials: true})
        reqBasket();
      }catch{}
    };
    init();
  }, [])
  

  return (
    <>
        <Banner/>
        <Catalog/>
        <OurBlog />
        <Feedback/>
        <Footer/>
        <ReportModal />
    </>
  );
}
export default App;