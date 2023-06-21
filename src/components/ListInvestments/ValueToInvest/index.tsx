import IncrementButton from '../IncrementButton';
import styles from './valueToInvest.module.scss';

export default function ValueToInvest() {
    return (
        <div className={styles.container}>
            <div className={styles.container__spanAndValue}>
                <span>R$ </span>
                <input type="text" value={'5.200.00'} />
            </div>
            <div className={styles.container__button}>
                <IncrementButton />
            </div>
        </div>
    );
}
