import { IContact } from './Contact';
import { IUserCardProps } from './IUserCardProps';

export interface IHistoryTransaction extends IUserCardProps {
    amount: number;
    date: string;
    to?: IContact;
    transactionType: 'deposit' | 'transfer' | 'investment';
}
