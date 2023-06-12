import styles from './ListFinance.module.scss';
import { BiTransferAlt } from 'react-icons/bi';
import { BsPiggyBank } from 'react-icons/bs';
import { ReactComponent as InvestmentIcon } from 'assets/imgs/investment.svg';
import { useNavigate } from 'react-router-dom';

export default function ListFinance() {
    const navigate = useNavigate();

    function handleClick(rota: string) {
        navigate(rota);
    }

    return (
        <div className={styles.container}>
            <h3>Finances</h3>
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
                    <InvestmentIcon
                        fill="#212121"
                        className={styles.container__iconBackground}
                    />
                    <span>Investment</span>
                </li>
            </ul>
        </div>
    );
}
