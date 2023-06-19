import { IContact } from 'types/Contact';
import styles from './TransferModal.module.scss';
import { useEffect, useState } from 'react';
import CardInfoSubHeader from 'components/ListFinance/CardInfoSubHeader';
import Button from 'components/Button';
import { IUserData } from 'types/UserData';
import { User } from 'firebase/auth';
import { transfer } from 'helpers/RequisiçõesFirebase';
import { IHistoryTransaction } from 'types/HistoryTransaction';
import dateFormatter from 'helpers/DateFormatter';

interface IModalProps {
    onClose: () => void;
    contact: IContact;
    userData: IUserData | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userAuthentication: User | null;
    setMessageTransfer: React.Dispatch<React.SetStateAction<string>>;
    setHistoryTransaction: React.Dispatch<React.SetStateAction<IHistoryTransaction[]>>;
}
export default function TransferModal({
    onClose,
    userData,
    contact,
    setLoading,
    userAuthentication,
    setMessageTransfer,
    setHistoryTransaction,
}: IModalProps) {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.body.classList.add('modal-open');

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    function handleClickTransferMoney() {
        if (userAuthentication && userData) {
            const userId = userAuthentication.uid.toString();
            const balance = Number(value.replace(/,/g, '')); // Remover vírgulas;
            setLoading(true);

            if (balance > userData.cards[0].balance) {
                setMessage('Insufficient balance to make a transfer');
                setValue('');
                setTimeout(() => {
                    setMessage('');
                }, 4000);
                return;
            }

            const confirmTransfer = window.confirm(
                `Do you want to transfer the amount of R$${balance.toFixed(2)}?`
            );

            if (!confirmTransfer) {
                return;
            }

            transfer(userId, balance)
                .then(() => {
                    const newTransaction = {
                        id: 1,
                        amount: balance,
                        date: dateFormatter.format(new Date()),
                        to: contact,
                        transactionType: 'Transfer',
                        userId: userId,
                        card: userData.cards[0],
                        read: false,
                    };

                    setHistoryTransaction(
                        (prevHistory) =>
                            [...prevHistory, newTransaction] as IHistoryTransaction[]
                    );

                    setMessageTransfer(
                        `you transferred the amount of R$${balance.toFixed(
                            2
                        )} with susseco to ${contact.name}`
                    );
                    onClose();
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

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.container__contact}>
                    <img
                        src={process.env.PUBLIC_URL + `${contact.avatar}`}
                        alt={contact.name}
                    />
                    <div className={styles.container__cardNumber}>
                        <p>** 7458</p>
                    </div>
                </div>
                <p className={styles.container__contactName}>{contact.name}</p>
            </div>
            {message && (
                <div className={styles.container__message}>
                    <p>{message}</p>
                </div>
            )}
            <div className={styles.container__input}>
                <input
                    type="text"
                    inputMode="numeric"
                    onChange={handleChange}
                    value={value}
                />
            </div>

            <CardInfoSubHeader balance={balance} numberCard={numberCard} />

            <Button background={''} fontColor={''} handleClick={handleClickTransferMoney}>
                Transfer
            </Button>
        </div>
    );
}
