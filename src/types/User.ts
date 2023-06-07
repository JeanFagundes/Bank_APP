import { ICard } from './Card';

export interface IUser {
    name: string;
    cpf: string;
    email: string;
    password: string;
    cards: ICard[];
}
