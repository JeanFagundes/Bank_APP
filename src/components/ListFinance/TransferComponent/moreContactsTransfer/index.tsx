import { IContact } from 'types/Contact';
import styles from './MoreContactsTransfer.module.scss';
import { useEffect } from 'react';
import SubHeader from 'components/SubHeader';

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

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <div className={styles.container}>
            <h3>All contacts</h3>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id} onClick={() => handleClick(contact)}>
                        <img
                            src={process.env.PUBLIC_URL + `${contact.avatar}`}
                            alt={contact.name}
                            width={48}
                            height={48}
                        />
                        <p>{contact.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
