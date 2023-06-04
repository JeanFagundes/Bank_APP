import Balance from 'components/Balance';
import styles from './Dashboard.module.scss';
import Buscador from 'components/Buscador';
import Card from 'components/Card';
import RequestCard from 'components/RequestCard';

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <Balance />
                <Buscador />
            </div>
            <div className={styles.container__card}>
                <RequestCard />
                {/* <Card /> */}
            </div>
        </div>
    );
}
