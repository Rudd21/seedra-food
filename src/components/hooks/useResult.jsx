import axios from "axios";
import { useState } from "react"

export const useResult = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [typeResult, setTypeResult] = useState('error')

    const [nameResult, setNameResult] = useState('')
    const [descResult, setDescResult] = useState('')

    const openResultModal = (type) => {
        setIsOpen(true)
        setTypeResult(type)
    }

    const closeResultModal = () => {
        setIsOpen(false)
        setNameResult('')
        setDescResult('')
    }
    return {
        isOpen,
        typeResult,
        nameResult,
        descResult,
        openResultModal,
        setNameResult,
        setDescResult,
        closeResultModal
    }
}