import { useContext, createContext } from 'react'
import { useEditProfile } from '../hooks/useEditProfile';

const EditProfileContext = createContext(null);

export const EditProfileProvider = ({ children }) => {
    const editProfile = useEditProfile();
    return(
        <EditProfileContext.Provider value={editProfile}>
            {children}
        </EditProfileContext.Provider>
    )
}
export const useEditProfileContext = ()=>{
    return useContext(EditProfileContext)
}