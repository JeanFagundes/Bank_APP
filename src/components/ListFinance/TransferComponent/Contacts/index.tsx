import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.scss';
import { IContact } from 'types/Contact';
import { IHistoryTransaction } from 'types/HistoryTransaction';
import messageicon from 'assets/imgs/messageicon.svg';

interface IContactsProps {
    historyTransaction: IHistoryTransaction[];
    contactsData: IContact[];
}

export default function Contacts({ historyTransaction, contactsData }: IContactsProps) {
    const navigate = useNavigate();

    function handleClick(contact: IContact, historyTransaction: IHistoryTransaction[]) {
        const filteredTransactions = historyTransaction.filter(
            (transaction) => transaction.to?.id === contact.id
        );
        navigate(`/contactChat/${encodeURIComponent(contact.name)}`, {
            state: { contact, historyTransaction: filteredTransactions },
        });
    }

    return (
        <div className={styles.container}>
            <p>Contacts</p>
            <ul>
                {contactsData.map((contact) => {
                    const filteredTransactions = historyTransaction.filter(
                        (transaction) => transaction.to?.id === contact.id
                    );

                    // Obtenha a última transação dentro de filteredTransactions
                    const lastTransaction =
                        filteredTransactions.length > 0
                            ? filteredTransactions[filteredTransactions.length - 1]
                            : null;
                    return (
                        <li
                            key={contact.id}
                            onClick={() => handleClick(contact, historyTransaction)}>
                            <div className={styles.container__listItem}>
                                <img
                                    src={process.env.PUBLIC_URL + `${contact.avatar}`}
                                    alt={contact.name}
                                />
                                <p>{contact.name}</p>
                            </div>
                            {lastTransaction && (
                                <div className={styles.container__dataAndMessage}>
                                    <img src={messageicon} alt="Visto" />
                                    <p className={styles.container__date}>{`${
                                        lastTransaction.date.split('/')[0]
                                    }/${lastTransaction.date.split('/')[1]}`}</p>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
