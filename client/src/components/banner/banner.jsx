import React, { useEffect, useState, useParams, useRef } from 'react'
import "./banner.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {apiRequest} from '../../../apiRequest';
import {delay, motion, transform, AnimatePresence} from 'framer-motion'
import { useBasketContext } from '../modalWindows/BasketContext';
import Navigation from '../navigation';

const banner = () => {
  const navigate = useNavigate();
  const [mostSaleList, setMostSaleList] = useState([])
  const [indexSale, setIndexSale] = useState(0);
  const [direction, setDirection] = useState(0)

  const ref = useRef();

  const {addToBasket} = useBasketContext();

  const slideVariants = {
    enter: (direction) =>({
      x:direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) =>({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  }

  useEffect(()=>{
    axios.get(`${apiRequest}/reqMostSaleProduts`)
    .then(res=>{setMostSaleList(res.data)})
    .catch(err=>{
      console.log("Невдалося вибрати товари з найбільшою знижкою", err)
    })
  }, [])
  

  const toProduct = (productId)=>{
    navigate(`/productPage/${productId}`)
  }

  return (
    <div>
        <Navigation />
        <main className='m-auto w-[80%]'>
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
            <div className="w-[100%]">
              {mostSaleList && mostSaleList.length > 0 ? (
                <AnimatePresence mode='wait' custom={direction}>
                  <motion.div
                    key={mostSaleList[indexSale].id} 
                    custom={direction}
                    variants={slideVariants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{duration: 0.4, ease: "easeInOut"}}
                    className='flex justify-between mt-7'>
                    <button className='flex z-2 rotate-[180deg] text-[30px] items-center mt-[70px]' 
                      onClick={()=>{
                        setDirection(-1)
                        setIndexSale(prev => (prev - 1) % mostSaleList.length);
                      }}>
                      <p className='bg-green-400 p-1 text-green-700 rounded-xs'>➔</p>
                    </button>
                    <div className='z-1 flex flex-col justify-evenly w-[40%] font-bold'>
                      <h1>{mostSaleList[indexSale].name}</h1>
                      <p className="">{mostSaleList[indexSale].description}</p>
                      <div className='flex flex-col'>
                        <div className="flex gap-2">
                          <img src="fire (2).png" alt="" />
                          <p className="text-[25px] text-green-800">${mostSaleList[indexSale].price}</p>
                          <p className="text-[20px] text-gray-400 self-center">
                            <s>${mostSaleList[indexSale].oldPrice}</s>
                          </p>
                        </div>
                        <div className="flex flex-row mt-[10px] gap-2">
                          <button className="banner-button1 transition" onClick={()=>addToBasket(mostSaleList[indexSale].id)}>Add to card</button>
                          <button className="banner-button2 transition" onClick={()=>toProduct(mostSaleList[indexSale].id)}>Discover</button>
                        </div>
                      </div>
                    </div>
                    <img className="w-80 h-80 z-0" src={`${apiRequest}/uploads/products/${mostSaleList[indexSale].image}`} alt="" />
                    <button className='flex z-2 text-[30px] items-center mt-[70px]' 
                      onClick={()=>{
                        setDirection(1)
                        setIndexSale(prev => (prev + 1) % mostSaleList.length);
                      }}>
                        <p className='bg-green-400 p-1 text-green-700 rounded-xs'>➔</p>
                      </button>
                  </motion.div>
                  <div></div>
                </AnimatePresence>
              ) : (
                <>
                  <div>
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
                  </div>
                  <img className="product-banner z-0" src='bungles.png' alt="" />
                </>
              )}
            </div>
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