import { MdArrowBackIos } from 'react-icons/md';
import styles from './SubHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export default function SubHeader({ children }: IProps) {
    function handleClick() {
        navigate('/dashboard');
    }
    const navigate = useNavigate();

    return (
        <div className={styles.subHeader}>
            <div onClick={handleClick} className={styles.subHeader__icon}>
                <MdArrowBackIos size={20} onClick={handleClick} />
            </div>
            <p>{children}</p>
        </div>
    );
}
