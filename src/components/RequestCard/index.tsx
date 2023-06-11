import Button from 'components/Button';
import styles from './RequestCard.module.scss';
import { useState, Dispatch, SetStateAction } from 'react';
import Modal from './Modal';

interface ISelectCardProps {
    setHasCard: Dispatch<SetStateAction<boolean>>;
}

export default function RequestCard({ setHasCard }: ISelectCardProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (): void => {
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (): void => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    function handleClick(): void {
        openModal();
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__request}>
                <h2>Apply for your card now</h2>
                <Button handleClick={() => handleClick()} background={''} fontColor={''}>
                    Request Card
                </Button>
            </div>
            {modalOpen && <Modal onClose={closeModal} setHasCard={setHasCard}></Modal>}
        </div>
    );
}
