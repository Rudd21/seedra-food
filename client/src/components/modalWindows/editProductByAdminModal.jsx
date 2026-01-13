import axios from "axios";
import { useEditProductContext } from "./editProductByAdminContext";
import { useState } from "react";

export const EditProductModal = ()=>{
    const {
        isOpen,
        productId,
        name,
        description,
        price,
        visible,
        setName,
        setDescription,
        setPrice,
        setVisible,
        closeModal
    } = useEditProductContext();

    const [openName, setOpenName] = useState(false)
    const [openDesc, setOpenDesc] = useState(false)
    const [openPrice, setOpenPrice] = useState(false)
    const [openVisible, setOpenVisible] = useState(false)

    if(!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="w-96 bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-3">Відредагувати товар</h2>

        <div>
            <nav className="flex-col">
                <button className="bg-gray-300 p-1 hover:bg-gray-500 transition rounded-xs" onClick={()=>setOpenName(true)}>До зміни назви</button>
                {openName ? (
                    <div className="border m-2 p-2">
                        <input className="border p-2 m-1 rounded-xs" type="text" onChange={(e)=>setName(e.target.value)} />
                        <button className="bg-yellow-400 m-2 p-2 text-sm" onClick={() => {
                            axios.post("https://localhost:3000/admin/changeName", {productId, name}, {
                                    withCredentials: true
                                }
                            ).then(res=>console.log("Успішно змінено назву товару!"))
                            .catch(err=>{
                                console.log(err)
                                console.error("Виникла помилка при змінені назви товару!")
                            })
                        }}>Змінити назву товару</button>
                        <button className="bg-red-400 m-2 p-2 text-sm hover:bg-red-700 transition" onClick={()=>setOpenName(false)}>Закрити</button>
                    </div>
                ) : (
                    <>
                        <br />        
                    </>
                )}
                <button className="bg-gray-300 p-1 hover:bg-gray-500 transition rounded-xs" onClick={()=>setOpenDesc(true)}>До змінити опису</button>
                {openDesc ? (
                    <div className="border m-2 p-2">
                        <input className="border p-2 m-1 rounded-xs" type="text" onChange={(e)=>changeName(e.target.value)} />
                        <button className="bg-yellow-400 m-2 p-2 text-sm" onClick={() => {
                            axios.post("https://localhost:3000/admin/changeDesc", {productId, description}, {
                                    withCredentials: true
                                }
                            ).then(res=>console.log("Успішно змінено опис товару!"))
                            .catch(err=>{
                                console.log(err)
                                console.error("Виникла помилка при змінені опису товару!")
                            })
                        }}>Змінити опис товару</button>
                        <button className="bg-red-400 m-2 p-2 text-sm hover:bg-red-700 transition" onClick={()=>setOpenDesc(false)}>Закрити</button>
                    </div>
                ) : (
                    <>
                        <br />                 
                    </>
                )}
                <button className="bg-gray-300 p-1 hover:bg-gray-500 transition rounded-xs" onClick={()=>setOpenPrice(true)}>До змінити ціни</button>
                {openPrice ? (
                    <div className="border m-2 p-2">
                        <input className="border p-2 m-1 rounded-xs" type="text" onChange={(e)=>changeName(e.target.value)} />
                        <button className="bg-yellow-400 m-2 p-2 text-sm" onClick={() => {
                            axios.post("https://localhost:3000/admin/changePrice", {productId,price}, {
                                    withCredentials: true
                                }
                            ).then(res=>console.log("Успішно змінено ціну товару!"))
                            .catch(err=>{
                                console.log(err)
                                console.error("Виникла помилка при змінені ціни товару!")
                            })
                        }}>Змінити ціну товару</button>
                        <button className="bg-red-400 m-2 p-2 text-sm hover:bg-red-700 transition" onClick={()=>setOpenPrice(false)}>Закрити</button>
                    </div>
                ) : (
                    <>
                        <br />                       
                    </>
                )}
                <button className="bg-gray-300 p-1 hover:bg-gray-500 transition rounded-xs" onClick={()=>setOpenVisible(true)}>До змінити видимості</button>
                {openVisible ? (
                    <div className="border m-2 p-2">
                        <button className="bg-yellow-400 m-2 p-2 text-sm" onClick={() => {
                            axios.post("https://localhost:3000/admin/changechangeVisible", {productId}, {
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
                )}
            </nav>
        </div>
        <div className="flex justify-end gap-2">
            <button
            className="px-4 py-2 bg-gray-300"
            onClick={()=>{
                setOpenName(false);
                setOpenDesc(false);
                setOpenPrice(false);
                setOpenVisible(false);
                closeModal();
            }}
            >
            Скасувати
            </button>
            </div>
        </div>
    </div>
    );
};