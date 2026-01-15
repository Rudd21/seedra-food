import React,{use, useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import axios from 'axios';
import "./catalog.scss"
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../modalWindows/BasketContext';

const catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]) 

  const {addToBasket} = useBasketContext();
  
  useEffect(() =>{
    axios.get("https://localhost:3000/catalog")
     .then(response => {
      setProducts(response.data)
    })
    .catch(error=>{
      console.error("Помилка при отримані каталогу: ", error)
    })
  }, [])
  
  const toProduct = (productId)=>{
    navigate(`/productPage/${productId}`)
  }
  
  const [catalogFilter, SetCatalogFilter] = useState(null)
  return (
    <div className="catalog-block">
      {/* Сортувальний список */}
      <ul className="sort0">
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter(null)}} >
            <img src="Frame 16.png" alt="All" />
            <p>ALL</p>
          </button>
        </li>
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter("BUNDLES")}} >
            <img src="Frame 15.png" alt="Bundles" />
            <p>BUNDLES</p>
          </button>
        </li>
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter("HERBS")}} >
            <img src="Group-leaf.png" alt="Herbs" />
            <p>HERBS</p>
          </button>
        </li>
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter("VEGETABLES")}} >
            <img src="Frame-tomato.png" alt="Vegetables" />
            <p>VEGETABLES</p>
          </button>
        </li>
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter("FRUITS")}} >
            <img src="Frame 60.png" alt="Fruits" />
            <p>FRUITS</p>
          </button>
        </li>
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter("SUPPLIES")}} >
            <img src="gardening tool.png" alt="Supplies" />
            <p>SUPPLIES</p>
          </button>
        </li>
        <li className="sort-item">
          <button className="sort-text" onClick={(e)=>{ 
            e.preventDefault(); 

            SetCatalogFilter("FLOWERS")}} >
            <img src="Flower.png" alt="Flowers" />
            <p>FLOWERS</p>
          </button>
        </li>
      </ul>

      {/* Продукти */}
        <div className="h-150 products">
          {products
          .filter(product => !catalogFilter || product.type == catalogFilter)
          .map((product) => (
          <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.3}}

            key={product.id}
            data-heart="no"
            className="h-95 product" 
            data-hashtag={product.type}>
            <div className="safe-productaImage">
              <button value="1" className="heart" type="button"></button>
              <img src="bungles.png" alt="Product" />
            </div>
            <p className="flex">
              Rating:
              <span>{product.avgRating}</span>
            </p>
            <h3 className='product_name' key={product.id}>{product.name}</h3>
            <div className="footer-card">
              {product.isSale ? (
                <div className='flex-col'>
                  <p className='text-gray-400 line-through'>$<span className="sort-price">{product.oldPrice}</span></p>
                  <p className='text-green-700'>$<span className="sort-price">{product.price}</span></p>
                </div>
              ):(
                  <p>$<span className="sort-price">{product.price}</span></p>
              )}
              <motion.button className='h-10 w-10 text-green-700 border border-[#CBCBCB] rounded-md hover:bg-gray-300 transition duration-300' onClick={()=>toProduct(product.id)}>More</motion.button>
              <motion.button className='rounded-md hover:bg-[#0D4715] transition duration-300' onClick={()=>addToBasket(product.id)}><img className="basket-product" src="basket.png" alt="Basket" /></motion.button>
            </div>
          </motion.div>
        ))}
        </div>

        {/* Інші продукти */}
        {/* <div data-heart="no" className="product" data-hashtag="HERBS">
          <div className="safe-productaImage">
            <button value="1" className="heart" type="button"></button>
            <img src="herbs.png" alt="Product" />
          </div>
          <p className="rainting rain-sort">
            <img src="user-rainting.png" alt="Rating" />
            <span>5.5</span>
          </p>
          <h3 id="search-text" value="CORN">
            HERBS SEEDRA Corn - Bodacious Hybrid Seeds for Indoor and Outdoor Planting
          </h3>
          <div className="footer-card">
            <div className="price">$<span className="sort-price">12.56</span></div>
            <img className="basket-product" src="basket.png" alt="Basket" />
          </div>
        </div> */}

        {/* <div data-heart="no" className="product" data-hashtag="BUNDLES">
          <div className="safe-productaImage">
            <button value="1" className="heart" type="button"></button>
            <img src="bungles.png" alt="Product" />
          </div>
          <p className="rainting rain-sort">
            <img src="user-rainting.png" alt="Rating" />
            <span>5.2</span>
          </p>
          <h3 id="search-text" value="HERBS">
            BUNDLES SEEDRA Spinach Seeds for Indoor and Outdoor Planting
          </h3>
          <div className="footer-card">
            <div className="price">$<span className="sort-price">12.56</span></div>
            <img className="basket-product" src="basket.png" alt="Basket" />
          </div>
        </div>

        <div data-heart="no" className="product" data-hashtag="FRUITS">
          <div className="safe-productaImage">
            <button value="1" className="heart" type="button"></button>
            <img src="strawberry.png" alt="Product" />
          </div>
          <p className="rainting rain-sort">
            <img src="user-rainting.png" alt="Rating" />
            <span>5.1</span>
          </p>
          <h3 id="search-text">
            FRUITS Seedra Cilantro Seeds for Planting Indoor and Outdoor
          </h3>
          <div className="footer-card">
            <div className="price">$<span className="sort-price">12.56</span></div>
            <img className="basket-product" src="basket.png" alt="Basket" />
          </div>
        </div>

        <div data-heart="no" className="product" data-hashtag="SUPPLIES">
          <div className="safe-productaImage">
            <button value="1" className="heart" type="button"></button>
            <img src="corn.png" alt="Product" />
          </div>
          <p className="rainting rain-sort">
            <img src="user-rainting.png" alt="Rating" />
            <span>5.0</span>
          </p>
          <h3 id="search-text">
            SUPPLIES SEEDRA Corn - Bodacious Hybrid Seeds for Indoor and Outdoor Planting
          </h3>
          <div className="footer-card">
            <div className="price">$<span className="sort-price">12.56</span></div>
            <img className="basket-product" src="basket.png" alt="Basket" />
          </div>
        </div>

        <div data-heart="no" className="product" data-hashtag="VEGETABLES">
          <div className="safe-productaImage">
            <button value="1" className="heart" type="button"></button>
            <img src="tomato.png" alt="Product" />
          </div>
          <p className="rainting rain-sort">
            <img src="user-rainting.png" alt="Rating" />
            <span>4.9</span>
          </p>
          <h3 id="search-text">
            VEGETABLES SEEDRA Spinach Seeds for Indoor and Outdoor Planting
          </h3>
          <div className="footer-card">
            <div className="price">$<span className="sort-price">12.56</span></div>
            <img className="basket-product" src="basket.png" alt="Basket" />
          </div>
        </div> */}
      </div>
  )
}

export default catalog