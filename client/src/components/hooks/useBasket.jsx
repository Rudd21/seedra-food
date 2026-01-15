import axios from "axios";
import { useState } from "react"

export const useBasket = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [basketList, setBasketList] = useState([]);

    const openBasketModal = () => {
        setIsOpen(true)
    }

    const reqBasket =  async () => {
        
        const res = await axios.get("https://localhost:3000/reqBasket",{
            withCredentials: true
        })

        setBasketList(res.data)
    }

    const addToBasket = async (productId) => {
        await axios.post("https://localhost:3000/addToBasket", {productId} ,{
            withCredentials: true
        })
        await reqBasket();
    }

    const removeFromBasket = async (productId) => {
        console.log("Попросили видалити:", productId)
        await axios.post("https://localhost:3000/removeFromBasket", {productId} ,{
            withCredentials: true
        })
        await reqBasket();
    }

    const closeBasketModal = () => {
        setIsOpen(false)
    }

    return{
        isOpen,
        basketList,
        reqBasket,
        addToBasket,
        removeFromBasket,
        openBasketModal,
        closeBasketModal
    }
}