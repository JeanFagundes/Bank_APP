import DepositComponent from 'components/ListFinance/DepositComponent';
import styles from './Deposit.module.scss';

export default function Deposit() {
    return (
        <div className={styles.container}>
            <div className={styles.container__depositContainer}>
                <DepositComponent />
            </div>
        </div>
    );
}
