import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextData {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Verificar o estado de autenticação ao carregar a página
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');

        if (storedLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    // Atualizar o estado de autenticação e o armazenamento local
    const handleSetIsLoggedIn = (loggedIn: boolean) => {
        setIsLoggedIn(loggedIn);
        localStorage.setItem('isLoggedIn', loggedIn.toString());
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: handleSetIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
