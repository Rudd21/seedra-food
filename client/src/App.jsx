import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Banner from "./components/banner/banner"
import Catalog from "./components/catalog/catalog"
import Feedback from "./components/feedbacks/feedbacks"
import Footer from "./components/footer/footer"
import {ReportModal} from './components/modalWindows/ReportModal';

const App=()=> {
  // const [userBasket, setUserBasket] = useState([]);

  // const reqBasket = () => {
  //   axios.get("https://localhost:3000/reqBasket", {
  //     withCredentials: true
  //   }).then(res => {
  //      setUserBasket([...res.data]);
  //   })
  //   .catch(err => console.error("Помилка при отримані корзини", err));
  // }

  // const addToBasket = async (productId) => {
  //   try{
  //     await axios.post("https://localhost:3000/addToBasket", {productId} ,{
  //       withCredentials: true
  //     });
  //     console.log("Товар добавлено в корзину:", productId)

  //     await reqBasket();
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  // const removeFromBasket = async (productId) => {
  //   try{
  //     await axios.post("https://localhost:3000/removeFromBasket", {productId}, {
  //       withCredentials: true
  //     });
  //     console.log("Товар видалено з корзини:", productId)
  //     await reqBasket();
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  
  useEffect(()=>{
    const init = async () =>{
      try{
        await axios.get('https://localhost:3000/createGuestSession', {withCredentials: true})
        await axios.get('https://localhost:3000/user-data', {withCredentials: true})
        reqBasket();
      }catch{}
    };
    init();
  }, [])
  

  return (
    <>
        <Banner/>
        <Catalog/>
        <Feedback/>
        <Footer/>
        <ReportModal />
    </>
  );
}
export default App;