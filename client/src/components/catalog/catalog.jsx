import React,{use, useEffect, useMemo, useState} from 'react'
import {motion} from 'framer-motion'
import axios from 'axios';
import "./catalog.scss"
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../modalWindows/BasketContext';

const catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]) 
  const [catalogPage, setCatalogPage] = useState(1);
  const [totalPages, setTotalPages] = useState()
  const [pageCache, setPageCache] = useState({})

  const {addToBasket} = useBasketContext();
  
  const generateCatalog = ()=>{
    axios.get(`https://localhost:3000/catalog?page=${catalogPage}`)
     .then(res => {
      setProducts(res.data.items)
      setTotalPages(res.data.totalPages)
    })
    .catch(error=>{
      console.error("Помилка при отримані каталогу: ", error)
    })
  }

  useEffect(()=>{
    if(pageCache[catalogPage]) return;

    const load = async ()=>{
      const res = await axios.get(`https://localhost:3000/catalog?page=${catalogPage}`);
      setPageCache(prev=>({
        ...prev,
        [catalogPage]: res.data.items
      }))
    }

    load();
  }, [catalogPage])

  useEffect(()=>{
    generateCatalog()
  }, [])
  
  useEffect(()=>{
    generateCatalog()
  }, [catalogPage])

  const toProduct = (productId)=>{
    navigate(`/productPage/${productId}`)
  }

  const currentProducts = useMemo(()=>{
    return pageCache[catalogPage] || [];
  }, [pageCache, catalogPage])
  
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
          {currentProducts
          .filter(product => !catalogFilter || product.type == catalogFilter)
          .map((product) => (
          <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.3}}

            key={product.id}
            product={product}
            data-heart="no"
            className="h-95 border border-gray-300 p-[10px] rounded-sm" 
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

        <div className="flex justify-center self-center">
          <button className='p-2 m-1 border rounded-sm hover:text-[#359740] transition disabled:text-gray-300' disabled={catalogPage == 1} onClick={()=>{
              setCatalogPage((prev) => Math.max(prev - 1,1))
          }}>← Previous</button>
          <button className='p-2 m-1 border rounded-sm hover:text-[#359740] transition disabled:text-gray-300' disabled={catalogPage == totalPages} onClick={()=>{
              setCatalogPage((prev) => prev + 1 )
            }}>Next →</button>
        </div>
      </div>
  )
}

export default catalog