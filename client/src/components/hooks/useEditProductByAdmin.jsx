import { useState } from "react";

export const useEditProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productId, setProductId] = useState(null);

    const openEditProductModal = (id) => {
        setProductId(id);
        setIsOpen(true);
    };

    const closeEditProductModal = () => {
        setIsOpen(false);
        setProductId(null);
    };

    return {
        isOpen,
        productId,
        openEditProductModal,
        closeEditProductModal
    };
};