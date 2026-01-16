import React from 'react'
import { useEditProfileContext } from './editProfileContext';

export const EditProfileModal = () => {
    const {
        isOpen,
        windowType,
        username,
        oldPassword,
        newPassword,
        repeatNewPassword,
        openEditProfileModal,
        setWindowType,
        setUsername,
        setOldPassword,
        setNewPassword,
        setRepeatNewPassword,
        closeEditProfileModal
    } = useEditProfileContext()

    const changeUsername = async() => {
        await axios.put("https://localhost:3000/user/changeUsername", { username }, {
            withCredentials: true
        })
    }

    const changePassword = async() => {
        await axios.put("https://localhost:3000/user/changePassword", { oldPassword, newPassword }, {
            withCredentials: true
        })
    }


    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            {windowType === 'username' ? (
                <div className='bg-white p-4 rounded shadow-lg'>
                    <button className='text-red-500 ml-70' onClick={closeEditProfileModal}>x</button>
                    <p className='m-3'>Введіть новий username:</p>
                    <input className='m-3 bg-white border rounded-xs' type="text" onChange={(e)=>setUsername(e.target.value)} />
                    <button className='p-3 bg-green-500 hover:bg-green-700 transition' onClick={changeUsername}>Змінити</button>
                </div>
            ):(
                <div className='bg-white p-4 rounded shadow-lg'>
                    <button className='text-red-500 ml-70' onClick={closeEditProfileModal}>x</button>
                    <p className='m-3'>Введіть поточний пароль:</p>
                    <input className='m-3 bg-white border rounded-xs' name="oldPassword" type="password" onChange={(e) => setOldPassword(e.target.value)} required />
                    <p className='m-3'>Введіть новий пароль:</p>
                    <input className='m-3 bg-white border rounded-xs' name='newPassword' type="password" onChange={(e) => setNewPassword(e.target.value)} required />
                    <p className='m-3'>Пвторно введіть новий пароль:</p>
                    <input className='m-3 bg-white border rounded-xs' name='repeatPassword' type="password" onChange={(e) => setRepeatNewPassword(e.target.value)}/>
                    <button disabled={repeatNewPassword !== newPassword}
                    className="
                        p-3 rounded
                        bg-green-500 hover:bg-green-700
                        disabled:bg-gray-400
                        disabled:cursor-not-allowed
                        transition
                    "
                    onClick={changePassword}>Змінити</button>
                </div>
            )}
        </div>
    )
};