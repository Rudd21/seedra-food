import React, { useEffect } from 'react'
import { useBasketContext } from './BasketContext'

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


    useEffect(()=>{
        console.log("basketList:", basketList);
        console.log("isArray:", Array.isArray(basketList));
    }, [basketList])

    if(!isOpen) return null;

    return (
        <div className='border w-100 h-1000 mx-[74%] bg-[#eaf1eb] fixed z-3 transition translate-x-0'>
            <h1 className='m-5'>Basket:</h1>
            {/* <p>{userBasket}</p> */}
            
            {basketList.length === 0 ? (
                <p className="m-5 text-gray-500">Корзина пуста</p>
            ) : (
                basketList.map((product) =>(
                <div key={product.id} className='m-5 p-3 border'>
                    <button 
                        className='w-5 h-5 color-red bg-red-700' 
                        onClick={()=> removeFromBasket(product.id)}>
                        x
                    </button>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <a className='bg-green-700 p-1 rounded' href={`https://localhost:5000/productPage/${product.id}`}>Детальніше</a>
                </div>
            )))}
            <button className='m-5 bg-green-700' onClick={()=> closeBasketModal()}>Close</button>
        </div>
    )
    }

export default BasketModal