import React,{use, useEffect, useMemo, useState} from 'react'
import {motion} from 'framer-motion'
import axios from 'axios';
import "./catalog.scss"
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../modalWindows/BasketContext';
import {apiRequest} from '../../../apiRequest';

const catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]) 
  const [catalogPage, setCatalogPage] = useState(1);
  const [totalPages, setTotalPages] = useState()
  const [pageCache, setPageCache] = useState({})

  const {addToBasket} = useBasketContext();
  
  const generateCatalog = ()=>{
    axios.get(`${apiRequest}/catalog?page=${catalogPage}`)
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
      const res = await axios.get(`${apiRequest}/catalog?page=${catalogPage}`);
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
    <div className="catalog-block" id='catalog'>
      {/* Сортувальний список */}
      <ul className="
            flex 
            lg:justify-between 
            
            lg:p-5 
            lg:flex-row 
            
            p-3
            overflow-x-scroll
            mt-10
            mb-10
          ">
        <li className="sort-item lg:p-10">
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

      {/* Товари */}
        <div className="
              grid 
              w-full 

              lg:grid-cols-4 
              lg:grid-rows-2 
              lg:gap-x-[15px] 
              gap-y-[15px]
              
              sm:grid-cols-1
              sm:grid-rows-8
            ">
          {currentProducts
          .filter(product => !catalogFilter || product.type == catalogFilter)
          .map((product) => (
          <motion.div
            initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: 0.3}}

            key={product.id}
            product={product}
            className="border border-gray-300 p-[10px] rounded-sm" 
            data-hashtag={product.type}>
            <div className="safe-productaImage items-end">
              <motion.button className='rounded-lg hover:bg-gray-300 w-10 h-10 transition duration-300' onClick={()=>addToBasket(product.id)}><img className="basket-product" src="basket.png" alt="Basket" /></motion.button>
              <img src={`${apiRequest}/uploads/products/${product.image}`} alt={product.name} />
            </div>
            <p className="flex">
              <img className='p-1' src="/ratingStar.png" alt="" /> 
              {product.avgRating ? (
                <span className='p-1'><span className='text-yellow-500'>:</span> {product.avgRating}</span>
              ) : (
                <span className='p-1'><span className='text-yellow-500'>:</span> 0 <span className='text-gray-400'>(no reviews)</span></span>
              )}
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
              <motion.button className='h-10 p-2 text-green-700 border border-[#CBCBCB] rounded-md hover:bg-gray-300 transition duration-300' onClick={()=>toProduct(product.id)}>Discover</motion.button>
            </div>
          </motion.div>
        ))}
        </div>

        <div className="flex justify-center self-center mt-10">
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