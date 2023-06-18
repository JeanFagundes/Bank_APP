import { IContact } from 'types/Contact';
import styles from './MoreContactsTransfer.module.scss';

interface IContactsProps {
    onClose: () => void;
    contacts: IContact[];
    handleContactClick: (contact: IContact) => void;
}
export default function MoreContactsTransfer({
    onClose,
    contacts,
    handleContactClick,
}: IContactsProps) {
    const handleClick = (contact: IContact) => {
        onClose();
        handleContactClick(contact);
    };

    return (
        <div className={styles.container}>
            <h3>All contacts</h3>
            <ul>
                {contacts.map((contact, index) => (
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
