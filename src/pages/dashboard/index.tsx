import Balance from 'components/Balance';
import styles from './Dashboard.module.scss';
import Buscador from 'components/Buscador';
import RequestCard from 'components/RequestCard';
import Card from 'components/Card';
import { useEffect, useState } from 'react';
import ListFinance from 'components/ListFinance';
import { findCardUser, showCards } from 'helpers/RequisiçõesFirebase';
import { IUserCardProps } from 'types/IUserCardProps';
import { authUserUid } from 'db/firebase';

export default function Dashboard() {
    const [card, setCard] = useState<IUserCardProps>();
    const [hasCard, setHasCard] = useState(false);
    async function verifyCard() {
        if (authUserUid) {
            const result = await findCardUser({ userId: authUserUid });
            setHasCard(result);
        }
    }
    async function showCard() {
        if (authUserUid) {
            const addCard = await showCards({ userId: authUserUid });
            setCard(addCard[0]);
        }
    }
    useEffect(() => {
        verifyCard();
        showCard();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                {card && <Balance balance={card.balance} />}
                <Buscador />
            </div>
            <div className={styles.container__card}>
                {card && hasCard ? (
                    <Card {...card} />
                ) : (
                    <RequestCard setHasCard={setHasCard} />
                )}
            </div>
            <div>
                <ListFinance />
            </div>
        </div>
    );
}
