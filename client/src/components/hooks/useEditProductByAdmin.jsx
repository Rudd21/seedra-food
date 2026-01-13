import { useState } from "react";

export const useEditProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productId, setProductId] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [price, setPrice] = useState('');
    const [visible, setVisible] = useState(true);

    const openModal = (id) => {
        setProductId(id);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setProductId(null);
    };

    return {
        isOpen,
        productId,
        name,
        description,
        oldPrice,
        price,
        visible,
        openModal,
        setName,
        setDescription,
        setOldPrice,
        setPrice,
        setVisible,
        closeModal
    };
};