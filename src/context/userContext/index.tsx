/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'db/firebase';
import { AuthContext } from 'context/AuthContext';
import { IUserData } from 'types/UserData';
import { IHistoryTransaction } from 'types/HistoryTransaction';

interface UserContextData {
    userData: IUserData | null;
    setUserData: React.Dispatch<React.SetStateAction<IUserData | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    historyTransaction: IHistoryTransaction[];
    setHistoryTransaction: React.Dispatch<React.SetStateAction<IHistoryTransaction[]>>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextData>({
    userData: null,
    setUserData: () => {},
    loading: true,
    setLoading: () => {},
    historyTransaction: [],
    setHistoryTransaction: () => {},
});

export const UserProvider = ({ children }: AuthProviderProps) => {
    const [userData, setUserData] = useState<IUserData | null>(null);
    const { userAuthentication } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [historyTransaction, setHistoryTransaction] = useState<IHistoryTransaction[]>(
        []
    );

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
                            setLoading(false);
                        }
                    });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
                setLoading(false);
            }
        };
        fetchUserData();
        console.log(loading);

        return () => {
            unsubscribe();
        };
    }, [userAuthentication]);

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
                loading,
                setLoading,
                historyTransaction,
                setHistoryTransaction,
            }}>
            {children}
        </UserContext.Provider>
    );
};
