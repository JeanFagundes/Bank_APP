import styles from './ListFinance.module.scss';
import { BiTransferAlt } from 'react-icons/bi';
import { BsPiggyBank } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import iconInvestment from 'assets/imgs/iconInvestment.png';

export default function ListFinance() {
    const navigate = useNavigate();

    function handleClick(rota: string) {
        navigate(rota);
    }

    return (
        <div className={styles.container}>
            <h2>Finances</h2>
            <ul className={styles.container__list}>
                <li onClick={() => handleClick('/transfer')}>
                    <BiTransferAlt className={styles.container__iconBackground} />
                    <span>Transfer</span>
                </li>

                <li onClick={() => handleClick('/deposit')}>
                    <BsPiggyBank className={styles.container__iconBackground} />
                    <span>Deposit</span>
                </li>

                <li onClick={() => handleClick('/investment')}>
                    <img
                        src={iconInvestment}
                        className={styles.container__iconBackground}
                    />
                    <span>Investment</span>
                </li>
            </ul>
        </div>
    );
}
