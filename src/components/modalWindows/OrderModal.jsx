import React, { useEffect } from 'react'
import { useOrderContext } from './OrderContext';
import axios from 'axios';
import { apiRequest } from '../../../serverRequest';

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

    const cancelOrder = (orderId) =>{
        axios.post(`${apiRequest}/updateStatusOrder`, {
            orderId, 
            status: 'CANCELLED'
        },{
            withCredentials: true
        })
        .then(res=>console("Замовлення скасовано"))
        .catch(err=>{
            console.log(err)
            console.error("Виникла помилка при змінені статуса")
        })
    }

    if(!isOpen) return null;

    return (
        <div className='border w-[80%] lg:w-100 h-1000 mx-[74%] bg-[#eaf1eb] overflow-y-scroll fixed z-4 transition translate-x-[-200px] lg:translate-x-[-30px]'>
            <div className='flex items-center justify-between h-15'>
                <h1 className='m-5'>Orders:</h1>            
                <button className='m-5 bg-green-700 p-1 text-white' onClick={()=> closeOrderModal()}>Close</button>
            </div>
            {orderList.length === 0 ? (
                <p className="m-5 text-gray-500">Замовлень немає</p>
            ) : (
                orderList.map((order) =>(
                <div key={order.id} className='flex flex-col items-end m-3 p-3 border'>
                    <button 
                        className='color-red bg-red-700 text-white p-1' 
                        onClick={()=> {
                            removeFromOrder(order.publicToken)
                            cancelOrder(order.publicToken)
                            }}>
                        <p>Cancel</p>
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