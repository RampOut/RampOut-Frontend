import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps{
    children: React.ReactNode;
}

interface AuthC{
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthC>({
    isAuthenticated: false,
    setIsAuthenticated: ()=>{},
})

export function AuthProvider({children}:AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    ) 
 
}

export const useAuth = () => useContext(AuthContext);