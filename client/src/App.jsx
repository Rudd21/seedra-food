import React,{useEffect} from 'react';
import axios from 'axios';
import Banner from "./components/banner/banner"
import Catalog from "./components/catalog/catalog"
import Feedback from "./components/feedbacks/feedbacks"
import Footer from "./components/footer/footer"

const App=()=> {
  useEffect(() => {
  axios.get('https://localhost:3000/user-data', {
    withCredentials: true
  }).then(res => {
    console.log("Автоматичний логін, користувач:", res.data);
  }).catch(() => {
    console.log("Неавторизований або токен протух.");
  });
}, []);

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