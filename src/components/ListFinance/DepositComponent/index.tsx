import { MdArrowBackIos } from 'react-icons/md';
import styles from './DepositComponent.module.scss';
import { useNavigate } from 'react-router-dom';

export default function DepositComponent() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/dashboard');
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <MdArrowBackIos onClick={handleClick} />
                <p>Deposit</p>
            </div>
            <div className={styles.container__title}>
                <p>Balance</p>
                <h3>R$ 0</h3>
            </div>
        </div>
    );
}
