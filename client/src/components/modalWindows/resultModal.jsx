import React from 'react'
import { useResultContext } from './resultContext'

export const ResultModal = () => {
    const {
        isOpen,
        typeResult,
        nameResult,
        descResult,
        openResultModal,
        setNameResult,
        setDescResult,
        closeResultModal
    } = useResultContext()


    if(!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        {typeResult == 'error' ? (
            <div className="w-96 bg-white border border-red-500 p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-3 text-center text-red-600">{nameResult}</h2>
                <p className='bg-red-200 p-3 text-center'>{descResult}</p>
                <button className='p-2 m-2 ml-34 w-20 bg-gray-300 hover:bg-gray-500 transition' onClick={closeResultModal}>OK</button>
            </div>
        ):(
            <div className="w-96 bg-white border border-green-500 p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-3 text-center text-green-600">{nameResult}</h2>
                <p className='bg-green-200 p-3 text-center'>{descResult}</p>
                <button className='p-2 m-2 ml-34 w-20 bg-gray-300 hover:bg-gray-500 transition' onClick={closeResultModal}>OK</button>
            </div>
        )}
    </div>
    );
}