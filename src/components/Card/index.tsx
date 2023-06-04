import styles from './Card.module.scss';
import chip from 'assets/imgs/chip.svg';
import visa from 'assets/imgs/visa.svg';
import logo from 'assets/imgs/logo.svg';
import paypass from 'assets/imgs/paypass.svg';

interface IBackgroundProps {
    background?: string;
}
export default function Card({ background }: IBackgroundProps) {
    return (
        <div className={styles.container} style={{ background }}>
            <div className={styles.container__cardArea}>
                <img src={visa} alt="logo visa" className={styles.container__item1} />
                <img src={logo} alt="logo bank" className={styles.container__item2} />
                <img
                    src={paypass}
                    alt="logo Pay Pass"
                    className={styles.container__item3}
                />
                <img src={chip} alt="chip" className={styles.container__item4} />
                <div className={styles.container__item5}>
                    <span className={styles.container__textOcult}>.... .... .... </span>
                    <span>1576</span>
                </div>
                <p className={styles.container__item6}>Zaramelo </p>
                <div className={styles.container__item7}>
                    <p className={styles.container__expiration}>VALID THRU</p>
                    <p className={styles.container__expirationDate}>01/23</p>
                </div>
            </div>
        </div>
    );
}
