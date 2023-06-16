import SubHeader from 'components/SubHeader';
import styles from './ContactChat.module.scss';
import { useLocation } from 'react-router-dom';

interface Contact {
    name: string;
    avatar: string;
}
export default function ContactChat() {
    const location = useLocation();
    // const { name } = useParams<{ name: string }>();
    const { contact } = location.state as { contact: Contact };

    return (
        <div className={styles.container}>
            <SubHeader name={contact.name} avatar={contact.avatar} />
            <p>{contact.name}</p>
            <img src={contact.avatar} alt="Avatar" />
        </div>
    );
}
