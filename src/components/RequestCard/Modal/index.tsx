import Card from 'components/Card';
import styles from './Modal.module.scss';
import { TouchEventHandler, useState, useContext } from 'react';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Button from 'components/Button';
import { addCardToUser } from 'helpers/RequisiçõesFirebase';
import { IUserCardProps } from 'types/IUserCardProps';
import { AuthContext } from 'context/AuthContext';

interface IModalProps {
    onClose: () => void;
}

export default function Modal({ onClose }: IModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const { userAuthentication } = useContext(AuthContext);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = [
        {
            cardNumber: `.... .... .... ${generateRandomNumber('4')}`,
            expirationDate: `${generateRandomNumber('2')}`,
            balance: 0,
            background: 'linear-gradient(to bottom, #eaeaea 0%, #b2d0ce 100%)',
        },
        {
            cardNumber: `.... .... .... ${generateRandomNumber('4')}`,
            expirationDate: `${generateRandomNumber('2')}`,
            balance: 0,
            background: 'linear-gradient(to bottom, #fcffdf 0%, #f1fe87 100%',
        },
        {
            cardNumber: `.... .... .... ${generateRandomNumber('4')}`,
            expirationDate: `${generateRandomNumber('2')}`,
            balance: 0,
            background: 'linear-gradient(to bottom, #f2eff4 0%, #b8a9c6 100%)',
        },
    ] as IUserCardProps[];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
        setTouchStartX(event.touches[0].clientX);
    };
    const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchDelta = touchEndX - touchStartX;

        if (touchDelta > 0) {
            handlePrevious();
        } else if (touchDelta < 0) {
            handleNext();
        }
    };

    function handleSelectCard(card: IUserCardProps) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (userAuthentication) {
            card.userId = userAuthentication.uid;
            addCardToUser(card);
        } else {
            console.error('Erro ao adicionar Cartão, usuario não está autenticado');
        }
    }

    function generateRandomNumber(quantity: string) {
        // Gera um número aleatório entre 1000 e 9999
        if (quantity === '2') {
            //mês
            const first = Math.floor(Math.random() * 11) + 1;
            //ano
            const second = Math.floor(Math.random() * 7) + 23;
            const result = `${first.toString().padStart(2, '0')}/${second.toString()}`;
            return result;
        }
        const numero = Math.floor(Math.random() * 9000) + 1000;
        return numero.toString();
    }

    return (
        <div
            className={styles.container}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}>
            <AiOutlineClose
                className={styles.container__close}
                size={40}
                onClick={onClose}></AiOutlineClose>

            <div className={styles.container__slide}>
                <FcPrevious size={25} onClick={handlePrevious}>
                    Previous
                </FcPrevious>
                <div className={styles.container__cards}>
                    {
                        <Card
                            background={items[currentIndex].background}
                            cardNumber={`.... .... .... ${generateRandomNumber('4')}`}
                            expirationDate={`${generateRandomNumber('2')}`}
                            balance={0}
                        />
                    }
                </div>
                <FcNext size={25} onClick={handleNext}>
                    Next
                </FcNext>
            </div>
            <div style={{ alignSelf: 'center', marginTop: '20px' }}>
                <Button
                    handleClick={() => handleSelectCard(items[currentIndex])}
                    background={''}
                    fontColor={''}>
                    Select
                </Button>
            </div>
        </div>
    );
}
