import { useContext, createContext } from 'react'
import { useBasket } from '../hooks/useBasket'

const BasketContext = createContext(null);

export const BasketContextProvider = ({ children }) => {
    const basket = useBasket();
    return(
        <BasketContext.Provider value={basket}>
            {children}
        </BasketContext.Provider>
    )
}

export const useBasketContext = ()=>{
    return useContext(BasketContext)
}