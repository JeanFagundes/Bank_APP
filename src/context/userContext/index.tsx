import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'db/firebase';
import { AuthContext } from 'context/AuthContext';
import { IUserData } from 'types/UserData';

interface UserContextData {
    userData: IUserData | null;
    setUserData: React.Dispatch<React.SetStateAction<IUserData | null>>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextData>({
    userData: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUserData: () => {},
});

export const UserProvider = ({ children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<IUserData | null>(null);
    const { userAuthentication } = useContext(AuthContext);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const unsubscribe = () => {};

        const fetchUserData = async () => {
            try {
                const userId = userAuthentication?.uid;
                if (userId) {
                    const userDocRef = doc(db, 'users', userId);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                        if (docSnap.exists()) {
                            setUserData(docSnap.data() as IUserData);
                        } else {
                            setUserData(null);
                        }
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };

        fetchUserData();

        return () => {
            unsubscribe();
        };
    }, [userAuthentication]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
