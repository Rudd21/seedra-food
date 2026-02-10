import axios from "axios";
import { useState } from "react"
import { apiRequest } from '../../serverRequest';

export const useBasket = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [basketList, setBasketList] = useState([]);

    const openBasketModal = () => {
        setIsOpen(true)
    }

    const reqBasket = async() => {

        const res = await axios.get(`${apiRequest}/reqBasket`, {
            withCredentials: true
        })

        setBasketList(res.data)
    }

    const addToBasket = async(productId) => {
        await axios.post(`${apiRequest}/addToBasket`, { productId }, {
            withCredentials: true
        })
        await reqBasket();
    }

    const removeFromBasket = async(productId) => {
        await axios.post(`${apiRequest}/removeFromBasket`, { productId }, {
            withCredentials: true
        })
        await reqBasket();
    }

    const closeBasketModal = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        basketList,
        reqBasket,
        addToBasket,
        removeFromBasket,
        openBasketModal,
        closeBasketModal
    }
}