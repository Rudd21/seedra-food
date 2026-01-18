import React, { useEffect, useState, useParams, useRef } from 'react'
import "./banner.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { useBasketContext } from '../modalWindows/BasketContext';
import Navigation from '../navigation';

const banner = () => {
  const navigate = useNavigate();
  const [mostSaleList, setMostSaleList] = useState([])
  const [indexSale, setIndexSale] = useState(0);

  const ref = useRef();

  const {addToBasket} = useBasketContext();

  useEffect(()=>{
    axios.get("https://localhost:3000/reqMostSaleProduts")
    .then(res=>{setMostSaleList(res.data)})
    .catch(err=>{
      console.log("Невдалося вибрати товари з найбільшою знижкою", err)
    })
  }, [])
  

  useEffect(() => {
    if (mostSaleList.length === 0) return;

    const interval = setInterval(() => {
      setIndexSale(prev => (prev + 1) % mostSaleList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mostSaleList.length]);

  const toProduct = (productId)=>{
    navigate(`/productPage/${productId}`)
  }

  return (
    <div>
        <Navigation />
        <main>
          <div className="p-0 m-0 banner">
            <div ref={ref} className="background-leafs flex">
              <img className='background-leaf leaf-1' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-2' src="leaf1.png" alt="" />
              <img className='background-leaf leaf-3' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-4' src="leaf1.png" alt="" />
              <img className='background-leaf leaf-5' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-6' src="leaf1.png" alt="" />
              <img className='background-leaf leaf-7' src="leaf2.png" alt="" />
              <img className='background-leaf leaf-8' src="leaf1.png" alt="" />
            </div>
              <div className="text-banner">
              {mostSaleList && mostSaleList.length > 0 ? (
                <div key={mostSaleList[indexSale].id}>
                  <h1>{mostSaleList[indexSale].name}</h1>
                  <p className="description-site">{mostSaleList[indexSale].description}</p>
                  <div className='flex flex-col'>
                    <div className="price-banner">
                      <img src="fire (2).png" alt="" />
                      <p className="price-text-banner">${mostSaleList[indexSale].price}</p>
                      <p className="grey-price-text-banner">
                        <s>${mostSaleList[indexSale].oldPrice}</s>
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <button className="banner-button1" onClick={()=>addToBasket(mostSaleList[indexSale].id)}>Add to card</button>
                      <button className="banner-button2" onClick={()=>toProduct(mostSaleList[indexSale].id)}>Discover</button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h1>SEEDRA Basil Seeds for Indoor and Outdoor Planting</h1>
                  <p className="description-site">
                    Be sure of our quality - the freshest batches of this season. Non-GMO, Heirloom - our seeds were tested and have the best germination ratings. Your easy growing experience is our guarantee
                  </p>
                  <div className="price-banner">
                    <img src="fire (2).png" alt="" />
                    <p className="price-text-banner">$12.56</p>
                    <p className="grey-price-text-banner">
                      <s>$15.56</s>
                    </p>
                  </div>
                  <div className="button-banner">
                    <button className="banner-button1">Add to card</button>
                    <button className="banner-button2">Discover</button>
                  </div>
                </>
              )}
              </div>
              <img className="product-banner z-0" src="bungles.png" alt="" />
          </div>
          <div className="banner-footer">
            <div className="banner-footer-text">
              <h2>We sell seeds</h2>
              <p>that always sprout and gardening supplies which never break</p>
            </div>
          </div>
        </main>

    </div>
  )
}

export default banner