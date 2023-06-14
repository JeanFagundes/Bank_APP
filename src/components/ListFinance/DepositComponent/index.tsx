import { MdArrowBackIos } from 'react-icons/md';
import styles from './DepositComponent.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import logovisa from 'assets/imgs/logovisa.svg';
import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { increaseBalance } from 'helpers/RequisiçõesFirebase';
import { UserContext } from 'context/userContext';

export default function DepositComponent() {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const { userAuthentication } = useContext(AuthContext);
    const { userData } = useContext(UserContext);

    console.log('recarregou');
    function handleClickIncrementBalance() {
        if (userAuthentication) {
            const userId = userAuthentication.uid.toString();
            const balance = Number(value.replace(/,/g, '')); // Remover vírgulas;
            increaseBalance(userId, balance)
                .then(() => {
                    setMessage(`Você depositou R$${balance} com sucesso`);
                    setTimeout(() => {
                        setMessage('');
                    }, 4000);
                })
                .catch((error) => {
                    setMessage(error.message);
                });
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        let numericValue = inputValue.replace(/[^0-9.]/g, '');

        if (numericValue.length > 7) {
            numericValue = numericValue.slice(0, 7);
        }

        if (!isNaN(Number(numericValue))) {
            const formattedValue = Number(numericValue).toLocaleString('en-US');
            setValue(formattedValue);
        }
    };

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
            {message && (
                <div className={styles.container__message}>
                    <p>{message}</p>
                </div>
            )}

            <div className={styles.container__title}>
                <p>Balance</p>
                <h3>{userData?.cards[0]?.balance || '0'}</h3>
            </div>

            <div className={styles.container__input}>
                <input value={value} type="text" onChange={handleChange} />
            </div>

            <ul className={styles.container__lista}>
                <li className={styles.container__logo}>
                    <img src={logovisa} alt="logovisa" />
                </li>
                <li className={styles.container__twoItens}>
                    <p>Visa</p>
                    <p>R$ 500.00</p>
                </li>
                <li className={styles.container__creditCardItem}>
                    <p>** 5534</p>
                </li>
            </ul>

            <div className={styles.container__button}>
                <Button
                    handleClick={handleClickIncrementBalance}
                    background={''}
                    fontColor={''}>
                    Deposit
                </Button>
            </div>
        </div>
    );
}
