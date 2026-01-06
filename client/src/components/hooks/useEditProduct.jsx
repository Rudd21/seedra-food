import { useState } from "react";

export const useEditProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productId, setProductId] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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
        price,
        visible,
        openModal,
        setName,
        setDescription,
        setPrice,
        setVisible,
        closeModal
    };
};