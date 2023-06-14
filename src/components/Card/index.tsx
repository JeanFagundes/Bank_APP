import styles from './Card.module.scss';
// import chip from 'assets/imgs/chip.svg';
import visa from 'assets/imgs/visa.svg';
import logo from 'assets/imgs/logo.svg';
import paypass from 'assets/imgs/paypass.svg';
import { ICard } from 'types/Card';

export default function Card({ cardNumber, expirationDate, background }: ICard) {
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
                {/* <img src={chip} alt="chip" className={styles.container__item4} /> */}
                <div className={styles.container__item5}>
                    <span className={styles.container__textOcult}>{cardNumber} </span>
                </div>
                <p className={styles.container__item6}>Zaramello</p>
                <div className={styles.container__item7}>
                    <p className={styles.container__expiration}>VALID THRU</p>
                    <p className={styles.container__expirationDate}>{expirationDate}</p>
                </div>
            </div>
        </div>
    );
}
