import SubHeader from 'components/SubHeader';
import styles from './ContactChat.module.scss';
import { useLocation } from 'react-router-dom';
import { IContact } from 'types/Contact';

export default function ContactChat() {
    const location = useLocation();
    const { contact } = location.state as { contact: IContact };

    return (
        <div className={styles.container}>
            <SubHeader name={contact.name} avatar={contact.avatar} />
            <p>{contact.name}</p>
            <img src={contact.avatar} alt="Avatar" />
        </div>
    );
}
