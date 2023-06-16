import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.scss';
import avatar from 'assets/imgs/avatar.png';

interface Contact {
    name: string;
    avatar: string;
}

export default function Contacts() {
    const navigate = useNavigate();

    function handleClick(contact: Contact) {
        navigate(`/contactChat/${encodeURIComponent(contact.name)}`, {
            state: { contact },
        });
    }

    const contacts: Contact[] = [
        { name: 'John', avatar: avatar },
        { name: 'Jennifer', avatar: avatar },
        { name: 'maya', avatar: avatar },
        { name: 'Jess', avatar: avatar },
        { name: 'Sister Alice', avatar: avatar },
    ];

    return (
        <div className={styles.container}>
            <p>Contacts</p>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index} onClick={() => handleClick(contact)}>
                        <img src={contact.avatar} alt="avatar" />
                        <p>{contact.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
