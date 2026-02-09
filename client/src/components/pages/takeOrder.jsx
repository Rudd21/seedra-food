import React, { useEffect, useState } from 'react'
import Navigation from '../navigation'
import Footer from '../footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiRequest } from '../../../serverRequest'

const TakeOrder = () => {

    const [checkToken, setCheckToken] =useState()
    const [productInfo, setProductInfo] = useState(null);
    const [countProduct, setCountProduct] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState()
    const totalPrice = (Number(productInfo?.price) * Number(countProduct)).toFixed(2)

    const {id} = useParams();

    useEffect(()=>{
        // Запит чи користувач авторизований
        axios.get(`${apiRequest}/user-data`,{
            withCredentials: true
        })
        .then(res=>{setCheckToken(res.data)})
        .catch(err=>{console.error("Немає токену або що:", err)})
    })

    useEffect(()=>{
        axios.get(`${apiRequest}/productPage/${id}`,{
            withCredentials: true,
        })
        .then(res=>{setProductInfo(res.data)})
        .catch(err=>{console.error("Памілка: ",err)})

    }, [id])

    const makeOrder = (e)=>{
        e.preventDefault()

        try{
            const order = {
            phoneNumber,
            totalPrice,
            productOwnerId: productInfo?.userId,
            };

            axios.post(`${apiRequest}/createOrder`, order, {
                withCredentials: true
            })
            .then(console.log("Успішно створено замолення"))
            .catch(err=>console.error("Виникла проблема при створені замовлення",err))
        }catch(err){
            console.log(err)
            console.error("Невдалось додати коментар")
        }
    }

    // const reqOrder = (orderId)=>{
    //     console.log(orderId)
    //     axios.get(`${apiRequest}/reqOrder`, {
    //         params: { orderId }
    //     })
    //     .then(res=>console.log(res.data))
    //     .catch(err=>{console.error("Памілка: ",err)})
    // }


  return (
    <div className='min-h-screen flex flex-col'>
        <Navigation />
        <main className='flex flex-grow w-[60%] m-auto items-center'>
            <div className='flex'>
                <img className='w-[300px] m-5 border border-gray-400 rounded-lg p-5' src={`${apiRequest}/uploads/products/${productInfo?.image}`} alt="Product_photo" />
                <div className="flex flex-col m-5 flex-grow">
                    <div className='flex border justify-between p-3 border-gray-400 text-[20px] rounded-lg'>
                        <h3>{productInfo?.name}</h3>
                        <p>Type: {productInfo?.type}</p>
                    </div>
                    <div className='flex flex-col w-[100%] border justify-between p-3 mt-2 border-gray-400 text-[20px] rounded-lg'>
                        <p className='text-gray-500'>Description: <span>{productInfo?.description}</span></p>
                    </div>
                    <div className='border context-center flex flex-col flex-grow justify-between p-2 mt-2 border-gray-400 rounded-lg items-center'>
                        <div className='flex'>
                            <p className='text-[25px]'>Total price: <span className='text-green-600'>${totalPrice}</span></p>
                            <div className='flex items-center ml-3'>
                                <button className='flex items-center p-2 h-5 hover:bg-gray-300 transition' onClick={()=>{setCountProduct((prev)=>prev-1)}}><p>-</p></button>
                                <p min="1" className='p-2'>{countProduct <= 0 ? setCountProduct(1) : countProduct}</p>
                                <button className='flex items-center p-2 h-5 hover:bg-gray-300 transition' onClick={()=>{setCountProduct((prev)=>prev+1)}}><p>+</p></button>
                            </div>
                        </div>
                        <div className='flex m-2'>
                            <p className='m-1'>Phone number:</p>
                            <input className='bg-gray-300 m-1' type="text" onChange={(e)=>setPhoneNumber(e.target.value)} required />
                        </div>
                        <button className='bg-green-400 p-2 w-[30%] text-white hover:bg-green-700 transition' onClick={(e)=>makeOrder(e)}>Make order</button>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default TakeOrder