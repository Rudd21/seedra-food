import axios from "axios";
import { useState } from "react"

export const useEditProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [windowType, setWindowType] = useState('username')

    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('')

    const openEditProfileModal = () => {
        setIsOpen(true);
    }

    const closeEditProfileModal = () => {
        setIsOpen(false);
        setUsername('');
        setOldPassword('');
        setNewPassword('');
        setRepeatNewPassword('');
    }

    return {
        isOpen,
        windowType,
        username,
        oldPassword,
        newPassword,
        repeatNewPassword,
        openEditProfileModal,
        setRepeatNewPassword,
        setWindowType,
        setUsername,
        setOldPassword,
        setNewPassword,
        closeEditProfileModal
    }

}