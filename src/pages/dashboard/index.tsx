import Balance from 'components/Balance';
import styles from './Dashboard.module.scss';
import Buscador from 'components/Buscador';
import RequestCard from 'components/RequestCard';
import Card from 'components/Card';
import { ReactNode, useEffect, useState } from 'react';
import ListFinance from 'components/ListFinance';

export default function Dashboard() {
    const [selectCard, setSelectCard] = useState('');
    const [card, setCard] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (selectCard) {
            setCard(<Card cardNumber={''} expirationDate={''} background={''} />);
        }
    }, [selectCard]);

    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <Balance />
                <Buscador />
            </div>
            <div className={styles.container__card}>
                {selectCard ? card : <RequestCard setSelectCard={setSelectCard} />}
            </div>
            <div>
                <ListFinance />
            </div>
        </div>
    );
}
