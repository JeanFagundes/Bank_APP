import Card from 'components/Card';
import styles from './Modal.module.scss';
import { TouchEventHandler, useState } from 'react';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import { IconContext } from 'react-icons';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: IModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);

    const items = [
        <Card
            background={'linear-gradient(to bottom, #eaeaea 0%, #b2d0ce 100%)'}
            key="1"
        />,
        <Card
            background={'linear-gradient(to bottom, #fcffdf 0%, #f1fe87 100%'}
            key="2"
        />,
        <Card
            background={'linear-gradient(to bottom, #f2eff4 0%, #b8a9c6 100%)'}
            key="3"
        />,
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
                <div className={styles.container__cards}>{items[currentIndex]}</div>
                <FcNext size={25} onClick={handleNext}>
                    Next
                </FcNext>
            </div>
        </div>
    );
}
