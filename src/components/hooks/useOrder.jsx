import axios from "axios";
import { useState } from "react"
import { apiRequest } from '../../serverRequest';

export const useOrder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [orderList, setOrderList] = useState([]);

    const openOrderModal = () => {
        setIsOpen(true)
    }

    const reqOrder = async() => {

        const res = await axios.get(`${apiRequest}/reqOrder`, {
            withCredentials: true
        })

        setOrderList(res.data)
    }

    const addToOrder = async(publicToken) => {
        await axios.post(`${apiRequest}/createOrder`, { publicToken }, {
            withCredentials: true
        })
        await reqOrder();
    }

    const removeFromOrder = async(publicToken) => {
        await axios.post(`${apiRequest}/deleteFromOrder`, { publicToken }, {
            withCredentials: true
        })
        await reqOrder();
    }

    const closeOrderModal = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        orderList,
        reqOrder,
        addToOrder,
        removeFromOrder,
        openOrderModal,
        closeOrderModal
    }
}