import { MdArrowBackIos } from 'react-icons/md';
import styles from './SubHeader.module.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
    name: string;
    avatar?: string;
}

export default function SubHeader({ name, avatar }: IProps) {
    function handleClick() {
        navigate('/dashboard');
    }
    const navigate = useNavigate();
    return (
        <div className={styles.subHeader}>
            <div onClick={handleClick} className={styles.subHeader__icon}>
                <MdArrowBackIos size={20} onClick={handleClick} />
            </div>
            {avatar ? (
                <div className={styles.subHeader__textWithAvatar}>
                    <img src={avatar} alt="Avatar" />
                    <p>{name}</p>
                </div>
            ) : (
                <p>{name}</p>
            )}
        </div>
    );
}
