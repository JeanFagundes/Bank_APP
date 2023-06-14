import Balance from 'components/Balance';
import styles from './Dashboard.module.scss';
import Buscador from 'components/Buscador';
import RequestCard from 'components/RequestCard';
import Card from 'components/Card';
import { useContext, useEffect, useState } from 'react';
import ListFinance from 'components/ListFinance';
import { AuthContext } from 'context/AuthContext';
import { UserContext } from 'context/userContext';
import { IUserData } from 'types/UserData';
import { ICard } from 'types/Card';

export default function Dashboard() {
    const [card, setCard] = useState<IUserData | ICard | undefined>();
    const [loading, setLoading] = useState(true);
    const { userAuthentication } = useContext(AuthContext);
    const { userData } = useContext(UserContext);

    console.log(userAuthentication);

    async function showCard() {
        if (userData && userData.cards[0]) {
            setCard(userData.cards[0]);
        }
    }
    useEffect(() => {
        async function fetchData() {
            await showCard();
            setLoading(false);
        }
        fetchData();
    }, []);

    console.log(userData?.cards ? [...userData.cards] : []);

    if (loading) {
        return <div>Loading...</div>; // ou qualquer outra indicação de carregamento
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                {card && userData && <Balance balance={userData.cards[0].balance} />}
                <Buscador />
            </div>
            <div className={styles.container__card}>
                {card && userData?.cards[0] ? (
                    <Card {...userData.cards[0]} />
                ) : (
                    <RequestCard />
                )}
            </div>
            <div>
                <ListFinance />
            </div>
        </div>
    );
}
