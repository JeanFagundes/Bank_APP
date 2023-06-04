import styles from './Balance.module.scss';

export default function Balance() {
    return (
        <div className={styles.container}>
            <p className={styles.container__text}>Your balance</p>
            <h2 className={styles.container__balance}>R$ 7,896</h2>
        </div>
    );
}
