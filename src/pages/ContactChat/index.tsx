import SubHeader from 'components/SubHeader';
import styles from './ContactChat.module.scss';
import { useLocation } from 'react-router-dom';
import { IContact } from 'types/Contact';
import { IHistoryTransaction } from 'types/HistoryTransaction';
import { useEffect, useRef } from 'react';

export default function ContactChat() {
    const containerRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const { contact, historyTransaction } = location.state as {
        contact: IContact;
        historyTransaction: IHistoryTransaction[];
    };

    // const reversedHistoryTransaction = [...historyTransaction].reverse();

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight; // Define o scroll no final do container
        }
    }, []);

    console.log(historyTransaction);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.container__subHeader}>
                <SubHeader name={contact.name} avatar={contact.avatar} />
            </div>
            <div className={styles.container__content}>
                <ul>
                    {historyTransaction.map((transaction, index) => (
                        <li key={index}>
                            <p>Transaction Done</p>
                            <p>R$ {transaction.amount.toFixed(2)}</p>
                            <p>{transaction.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
