import {createContext, useContext} from 'react'
import { useOrder } from '../hooks/useOrder'

const OrderContext = createContext(null);

export const OrderContextProvider = ({children}) =>{
    const order = useOrder();
    return(
        <OrderContext.Provider value={order}>
            {children}
        </OrderContext.Provider>
    )

}

export const useOrderContext = ()=>{
    return useContext(OrderContext)
}