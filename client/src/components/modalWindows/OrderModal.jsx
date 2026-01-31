import React, { useEffect } from 'react'
import { useOrderContext } from './OrderContext';

export const OrderModal = () => {
    const {
        isOpen,
        orderList,
        reqOrder,
        addToOrder,
        removeFromOrder,
        openOrderModal,
        closeOrderModal
    } = useOrderContext();

    if(!isOpen) return null;

    return (
        <div className='border w-100 h-1000 mx-[74%] bg-[#eaf1eb] fixed z-4 transition translate-x-0'>
            <div className='flex items-center justify-between h-15'>
                <h1 className='m-5'>Basket:</h1>            
                <button className='m-5 bg-green-700 p-1 text-white' onClick={()=> closeOrderModal()}>Close</button>
            </div>
            {orderList.length === 0 ? (
                <p className="m-5 text-gray-500">Корзина пуста</p>
            ) : (
                orderList.map((order) =>(
                <div key={order.id} className='flex flex-col items-end m-3 p-3 border'>
                    <button 
                        className='w-6 h-6 color-red bg-red-700 text-white' 
                        onClick={()=> removeFromOrder(order.publicToken)}>
                        <p>x</p>
                    </button>
                    <div className='flex w-[100%]'>
                        <div className='flex-grow flex ml-1 flex-row self-center justify-between'>
                            <div className='flex flex-col justify-evenly text-[13px] h-[100%]'>
                                <p><strong>ID: {order.id}</strong></p>
                                <p><strong>Total price: <span className='text-green-700'>${order.totalPrice}</span></strong></p>
                                <p className='text-gray-400'><strong>{order.phoneNumber}</strong></p>
                                <p><strong>Status: {order.status}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            )))}
        </div>
    )
    }

export default OrderModal