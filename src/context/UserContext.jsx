import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        isAuthentified: false
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUserContext(){
    const userContext = useContext(UserContext);

    if(userContext == null){
        throw new Error('useUserContext must be used with a UserProvider');
    }
    return userContext;
}

export default useUserContext;
