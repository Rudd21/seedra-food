import React,{useEffect} from 'react';
import axios from 'axios';
import Banner from "./components/banner/banner"
import Catalog from "./components/catalog/catalog"
import Feedback from "./components/feedbacks/feedbacks"
import Footer from "./components/footer/footer"

const App=()=> {
  useEffect(()=>{
    const init = async () =>{
      try{
        await axios.get('https://localhost:3000/createGuestSession', {withCredentials: true})
        await axios.get('https://localhost:3000/user-data', {withCredentials: true})
      }catch{}
    };
    init();
  }, [])
  return (
    <div>
        <Banner/>
        <Catalog/>
        <Feedback/>
        <Footer/>
    </div>
  );
}
export default App;