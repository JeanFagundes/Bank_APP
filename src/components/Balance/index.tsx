import styles from './Balance.module.scss';

interface IBalanceProps {
    balance: number;
}

export default function Balance({ balance = 0 }: IBalanceProps) {
    return (
        <div className={styles.container}>
            <p className={styles.container__text}>Your balance</p>
            <h2 className={styles.container__balance}>R$ {balance.toFixed(2)}</h2>
        </div>
    );
}
