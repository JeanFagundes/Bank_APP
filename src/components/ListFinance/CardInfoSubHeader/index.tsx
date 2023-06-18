import styles from './CardInfoSubHeader.module.scss';
import logovisa from 'assets/imgs/logovisa.svg';

interface ICardInfoProps {
    balance: string | undefined;
    numberCard: string | undefined;
}

export default function CardInfoSubHeader({ balance, numberCard }: ICardInfoProps) {
    return (
        <ul className={styles.container}>
            <li className={styles.container__logo}>
                <img src={logovisa} alt="logovisa" />
            </li>
            <li className={styles.container__twoItens}>
                <p>Visa</p>
                <p>{balance}</p>
            </li>
            <li className={styles.container__creditCardItem}>
                <p>** {numberCard}</p>
            </li>
        </ul>
    );
}
