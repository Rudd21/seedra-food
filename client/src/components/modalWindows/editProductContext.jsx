import {createContext, useContext} from 'react'
import { useEditProduct } from '../hooks/useEditProduct';

const EditProductContext = createContext(null)

export const EditProductProvider = ({children}) => {
    const editProduct = useEditProduct();
    return (
        <EditProductContext.Provider value={editProduct}>
            {children}
        </EditProductContext.Provider>
    );
};

export const useEditProductContext= ()=>{
    return useContext(EditProductContext)
}