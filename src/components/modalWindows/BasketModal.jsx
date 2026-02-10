import React, { useEffect } from 'react'
import { useBasketContext } from './BasketContext'
import { apiRequest, uploads } from '../../serverRequest';
import { Link } from 'react-router-dom';

export const BasketModal = () => {
    const {
        isOpen,
        basketList,
        reqBasket,
        addToBasket,
        removeFromBasket,
        openBasketModal,
        closeBasketModal
    } = useBasketContext();

    if(!isOpen) return null;

    return (
        <div className='border w-[80%] lg:w-100 h-1000 mx-[74%] bg-[#eaf1eb] overflow-y-scroll fixed z-4 transition translate-x-[-200px] lg:translate-x-0'>
            <div className='flex items-center justify-between h-15'>
                <h1 className='m-5'>Basket:</h1>            
                <button className='m-5 bg-green-700 p-1 text-white' onClick={()=> closeBasketModal()}>Close</button>
            </div>
            {basketList.length === 0 ? (
                <p className="m-5 text-gray-500">Корзина пуста</p>
            ) : (
                basketList.map((product) =>(
                <div key={product.id} className='flex flex-col w-[80%] lg:w-[100%] items-end m-3 p-3 border'>
                    <button 
                        className='w-6 h-6 color-red bg-red-700 text-white' 
                        onClick={()=> removeFromBasket(product.id)}>
                        <p>x</p>
                    </button>
                    <div className='flex w-[100%] flex-col items-center lg:flex-row'>
                        <img className='w-25 h-25' src={`${uploads}/uploads/products/${product.image}`} alt="" />
                            <div className='flex-grow flex ml-1 flex-row self-center justify-between'>
                                <div className='flex flex-col justify-evenly text-[13px] h-[100%]'>
                                    <p><strong>ID: {product.id}</strong></p>
                                    <p><strong>{product.name}</strong></p>
                                    <p className='text-gray-400 text-[13px]'><strong>Type: {product.type}</strong></p>
                                    {product.isSale ? (
                                        <div className='flex flex-row items-center'>
                                            <p><strong>Price: <span className='text-green-600'>${product.price}</span></strong></p>
                                            <p className='line-through text-gray-600 ml-2 text-[13px]'><strong>${product.oldPrice}</strong></p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p><strong>Price: <span>${product.price}</span></strong></p>
                                        </div>
                                    )}
                                    <Link className='p-1 w-[50%] text-center bg-blue-400 text-white hover:bg-blue-600 transition' to={`/productPage/${product.id}`}>Product page</Link>
                                </div>
                            </div>
                    </div>
                </div>
            )))}
        </div>
    )
    }

export default BasketModal