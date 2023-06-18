import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.scss';
import contactsData from 'data/contacts.json';

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

    return (
        <div className={styles.container}>
            <p>Contacts</p>
            <ul>
                {contactsData.map((contact, index) => (
                    <li key={index} onClick={() => handleClick(contact)}>
                        <img
                            src={process.env.PUBLIC_URL + `${contact.avatar}`}
                            alt={contact.name}
                        />
                        <p>{contact.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
