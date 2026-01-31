import axios from "axios";
import { useEditProductContext } from "./editProductByAdminContext";
import { useEffect, useState } from "react";
import {apiRequest} from '../../../apiRequest';

export const EditProductModal = ()=>{
    const {
        isOpen,
        productId,
        name,
        description,
        oldPrice,
        price,
        visible,
        setName,
        setDescription,
        setOldPrice,
        setPrice,
        setVisible,
        closeEditProductModal
    } = useEditProductContext();

    const [openName, setOpenName] = useState(false)
    const [openDesc, setOpenDesc] = useState(false)
    const [openPrice, setOpenPrice] = useState(false)
    const [openVisible, setOpenVisible] = useState(false)

    const [isOldPrice, setIsOldPrice] = useState(false)

    const [productInfo, setProductInfo] = useState([])
    const [image, setImage] = useState()

    useEffect(()=>{
        axios.get(`${apiRequest}/productPage/${productId}`,{
            withCredentials: true,
        })
        .then(res=>{
            setProductInfo(res.data)
            if(res.data.oldPrice){
                isOldPrice(true)
            }else{
                isOldPrice(false)
            }
        })
        .catch(err=>{console.error("Памілка: ",err)})

    }, [productId])

    const handleChange = (e) => {
        setProductInfo({
        ...productInfo,
        [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        setImage(file)
        console.log("Файлик є")
    };

    if(!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-3">Edit product</h2>
        {productInfo && (
            <div className="flex">
                <div className='flex flex-col p-2'>
                    <h1 className='m-2'>Preview:</h1>
                        <div className="safe-productaImage">
                        <div className="safe-productaImage items-end">
                            <button className='rounded-lg hover:bg-gray-300 w-10 h-10 transition duration-300' onClick={()=>addToBasket()}><img className="basket-product" src="../basket.png" alt="Basket" /></button>
                            <img className="h-55 w-55" src={`${apiRequest}/uploads/products/${productInfo.image}`} alt={productInfo.name} />
                        </div>
                        </div>
                        <p className="flex">
                        <p>Ratign: {productInfo.avgRating ? productInfo.avgRating : 0}</p>
                        <span></span>
                        </p>
                        <h3 className='product_name'>{productInfo.name}</h3>
                        <div className="footer-card">
                            <div className="flex price items-center justify-between">
                                {productInfo.isSale ? (
                                    <div className='flex-col'>
                                        <p className='text-gray-400 line-through'>$<span className="sort-price">{productInfo.oldPrice}</span></p>
                                        <p className='text-green-700'>$<span className="sort-price">{productInfo.price}</span></p>
                                    </div>
                                ):(
                                    <p>$<span className="sort-price">{productInfo.price}</span></p>
                                )}
                                <button className='h-10 p-1 text-green-700 border border-[#CBCBCB] rounded-md'>Discover</button>
                                {/* <button className='rounded-md' ><img className="./basket-product" src="basket.png" alt="Basket" /></button> */}
                            </div>
                        </div>
                </div>
                <div className='flex flex-col'>
                        <label className="flex flex-col">
                            Image:
                            <input id="productType" list="TypesProduct"
                            className='bg-gray-300 p-2 rounded-xl'
                            type="file"
                            accept='image/*'
                            onChange={handleFileChange}
                        />
                        </label>
                        <br />
                        <label className="flex flex-col">
                            Product Name:
                            <input
                            className='bg-gray-300 border p-2 rounded-[5px]'
                            type="text"
                            name="name"
                            value={productInfo.name}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                        <label className="flex flex-col">
                            Product Type:
                            <input id="productType" list="TypesProduct"
                            className='bg-gray-300 border p-2 rounded-[5px]'
                            name="type"
                            value={productInfo.type}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                        <div className="flex">
                            <label className="flex flex-col">
                                Price:
                                <input
                                className='bg-gray-300 border p-2 rounded-[5px]'
                                type="number"
                                name="price"
                                value={productInfo.price}
                                onChange={handleChange}
                                required
                            />
                            </label>
                            <label className="flex flex-col">
                                <div className="flex">
                                    <input type="checkbox" onChange={()=>setIsOldPrice((prev)=> !prev)} />
                                    <p className="ml-1" >Old Price:</p>
                                </div>
                                <input
                                className='bg-gray-300 border p-2 rounded-[5px] disabled:bg-white'
                                type="number"
                                name="oldPrice"
                                value={productInfo.oldPrice}
                                disabled={!isOldPrice}
                                onChange={handleChange}
                                required
                            />
                            </label>
                        </div>
                        <br />
                        <label className="flex flex-row">
                            Description:
                            <textarea
                            className='bg-white border ml-2 p-2 rounded-xl w-[200%]'
                            name="description"
                            value={productInfo.description}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                        <button className='bg-green-300 p-2 hover:bg-green-600 transition' type="submit">Change Product</button>
                </div>
                {/*
                <button className="bg-gray-300 p-1 hover:bg-gray-500 transition rounded-xs" onClick={()=>setOpenVisible(true)}>До змінити видимості</button>
                {openVisible ? (
                    <div className="border m-2 p-2">
                        <button className="bg-yellow-400 m-2 p-2 text-sm" onClick={() => {
                            axios.post(`${apiRequest}/admin/changechangeVisible`, {productId}, {
                                    withCredentials: true
                                }
                            ).then(res=>console.log("Успішно змінено видимості товару!"))
                            .catch(err=>{
                                console.log(err)
                                console.error("Виникла помилка при змінені видимості товару!")
                            })
                        }}>Змінити видимість товару</button>
                        <button className="bg-red-400 m-2 p-2 text-sm hover:bg-red-700 transition" onClick={()=>setOpenVisible(false)}>Закрити</button>
                    </div>
                ) : (
                    <>
                        <br />
                    </>
                )} */}
                </div>
        )}
            <div className="flex justify-end gap-2">
                <button
                className="px-4 mt-2 py-2 bg-gray-300"
                onClick={()=>{
                    setOpenName(false);
                    setOpenDesc(false);
                    setOpenPrice(false);
                    setOpenVisible(false);
                    setOldPrice(false);
                    closeEditProductModal();
                }}
                >
                Скасувати
                </button>
            </div>
        </div>
    </div>
    );
};