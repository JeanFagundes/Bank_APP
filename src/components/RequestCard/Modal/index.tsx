import Card from 'components/Card';
import styles from './Modal.module.scss';
import { TouchEventHandler, useState, Dispatch, SetStateAction } from 'react';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import Button from 'components/Button';
import { ICard } from 'types/Card';

interface IModalProps {
    onClose: () => void;
    setSelectCard: Dispatch<SetStateAction<string>>;
}

export default function Modal({ onClose, setSelectCard }: IModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);

    const items: ICard[] = [
        {
            id: 1,
            cardNumber: '.... .... .... 4242',
            expirationDate: '12/24',
            balance: 0,
            background: 'linear-gradient(to bottom, #eaeaea 0%, #b2d0ce 100%)',
        },
        {
            id: 2,
            cardNumber: '.... .... .... 4242',
            expirationDate: '12/24',
            balance: 0,
            background: 'linear-gradient(to bottom, #fcffdf 0%, #f1fe87 100%',
        },
        {
            id: 3,
            cardNumber: '.... .... .... 4242',
            expirationDate: '12/24',
            balance: 0,
            background: 'linear-gradient(to bottom, #f2eff4 0%, #b8a9c6 100%)',
        },
    ];

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

    function handleSelectCard(card: string) {
        setSelectCard(card);
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
                            cardNumber={'4242 4242 4242 4242'}
                            expirationDate={'12/24'}
                        />
                    }
                </div>
                <FcNext size={25} onClick={handleNext}>
                    Next
                </FcNext>
            </div>
            <div style={{ alignSelf: 'center' }}>
                <Button
                    handleClick={() => handleSelectCard(items[currentIndex].background)}
                    background={''}
                    fontColor={''}>
                    Select
                </Button>
            </div>
        </div>
    );
}
