import DepositComponent from 'components/ListFinance/DepositComponent';
import styles from './Deposit.module.scss';

export default function Deposit() {
    return (
        <div className={styles.container}>
            <DepositComponent />
        </div>
    );
}
