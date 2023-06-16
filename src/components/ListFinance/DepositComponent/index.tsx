import styles from './DepositComponent.module.scss';
import Button from 'components/Button';
import logovisa from 'assets/imgs/logovisa.svg';
import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { increaseBalance } from 'helpers/RequisiçõesFirebase';
import { UserContext } from 'context/userContext';
import SubHeader from 'components/SubHeader';

export default function DepositComponent() {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    const { userAuthentication } = useContext(AuthContext);
    const { userData, loading, setLoading } = useContext(UserContext);

    function handleClickIncrementBalance() {
        if (userAuthentication) {
            const userId = userAuthentication.uid.toString();
            const balance = Number(value.replace(/,/g, '')); // Remover vírgulas;
            setLoading(true);
            increaseBalance(userId, balance)
                .then(() => {
                    setMessage(`Você depositou R$${balance.toFixed(2)} com sucesso`);
                    setValue('');
                    setTimeout(() => {
                        setMessage('');
                    }, 4000);
                })
                .catch((error) => {
                    setMessage(error.message);
                })
                .finally(() => {
                    setLoading(false);
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

    const numberCard = userData?.cards[0]?.cardNumber?.split(' ')[3];
    const balance = userData?.cards[0]?.balance.toLocaleString('en-US');

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <SubHeader name={'Deposit'}></SubHeader>
            {message && (
                <div className={styles.container__message}>
                    <p>{message}</p>
                </div>
            )}

            <div className={styles.container__title}>
                <p>Balance</p>
                <h3>{balance}</h3>
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
                    <p>{balance}</p>
                </li>
                <li className={styles.container__creditCardItem}>
                    <p>** {numberCard}</p>
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
