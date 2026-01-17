import React, { useEffect, useState, useParams } from 'react'
import "./banner.scss"
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {motion, transform} from 'framer-motion'
import { useBasketContext } from '../modalWindows/BasketContext';
import Navigation from '../navigation';

const banner = () => {

  return (
    <div>
        <Navigation />
        <main>
          <div className="p-0 m-0 banner">
            <div className="background-leafs">
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