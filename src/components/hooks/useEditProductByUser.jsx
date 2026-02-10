import { useState } from "react"

export const useEditProductByUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productId, setProductId] = useState();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [visible, setVisible] = useState(true);

    const openEditorProductByUser = (id)=>{
        setProductId(id);
        setIsOpen(true);
    };

    const closeEditorProductByUser = ()=>{
        setIsOpen(false);
        setProductId(null);
    };

    return{
        isOpen,
        productId,
        name,
        description,
        price,
        visible,
        openEditorProductByUser,
        setName,
        setDescription,
        setPrice,
        setVisible,
        closeEditorProductByUser
    }
}