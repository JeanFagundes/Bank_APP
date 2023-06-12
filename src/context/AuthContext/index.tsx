import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextProps {
    userAuthentication: User | null;
    setUserAuthentication: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    userAuthentication: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUserAuthentication: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userAuthentication, setUserAuthentication] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (userAuthentication) => {
            setUserAuthentication(userAuthentication);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ userAuthentication, setUserAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};
