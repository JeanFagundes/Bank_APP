import { ReactNode, createContext, useContext, useState } from 'react';
import { IUser } from 'types/User';

interface IUserContextProps {
    users: IUser[];
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export const UserContext = createContext<IUserContextProps>({} as IUserContextProps);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [users, setUsers] = useState<IUser[]>([]);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};
