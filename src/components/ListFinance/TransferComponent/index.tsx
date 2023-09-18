import styles from './TransferComponent.module.scss';
import avatar from 'assets/imgs/avatar.png';
import SubHeader from 'components/SubHeader';
import Contacts from './Contacts';
import contactsData from 'data/contacts.json';
import { useContext, useEffect, useState } from 'react';
import TransferModal from './TranferModal';
import { IContact } from 'types/Contact';
import { UserContext } from 'context/userContext';
import { AuthContext } from 'context/AuthContext';
import MoreContactsTransfer from './moreContactsTransfer';
import { BiPlusCircle } from 'react-icons/bi';

export default function TransferComponent() {
    const [openModal, setOpenModal] = useState<IContact | null>(null);
    const [openModalContacts, setOpenModalContacts] = useState<IContact[] | null>(null);
    const [messageTransfer, setMessageTransfer] = useState('');
    const { userAuthentication } = useContext(AuthContext);
    const { userData, setLoading, historyTransaction, setHistoryTransaction } =
        useContext(UserContext);

    const handleContactClick = (contact: IContact) => {
        setOpenModal(contact);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
    };

    const handleMoreContacts = (contacts: IContact[]) => {
        setOpenModalContacts(contacts);
    };

    const handleCloseModalContacts = () => {
        setOpenModalContacts(null);
    };

    useEffect(() => {
        if (messageTransfer) {
            setInterval(() => {
                setMessageTransfer('');
            }, 4000);
        }
        return () => {
            clearInterval(5000);
        };
    }, [messageTransfer]);

    const balance = userData?.cards[0]?.balance.toLocaleString('en-US');

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container__subHeader}>
                    <SubHeader name={'Transfer'} />
                </div>
                {messageTransfer && (
                    <div className={styles.container__message}>
                        <p>{messageTransfer}</p>
                    </div>
                )}
                <div className={styles.container__title}>
                    <p>Balance</p>
                    <h3>R$ {balance}</h3>
                </div>

                {/* Lista de contatos no card, no maximo 3 e 1 para adicionais*/}
                <div className={styles.container__card}>
                    <p>Send money to</p>
                    <ul>
                        {contactsData.slice(0, 3).map((contact) => (
                            <li
                                key={contact.id}
                                onClick={() => handleContactClick(contact)}>
                                <img
                                    src={process.env.PUBLIC_URL + `${contact.avatar}`}
                                    alt={contact.name}
                                />
                                <p>{contact.name}</p>
                            </li>
                        ))}
                        <li onClick={() => handleMoreContacts(contactsData)}>
                            <BiPlusCircle size={48} />
                            <p>Send</p>
                        </li>
                    </ul>
                </div>
                <Contacts
                    historyTransaction={historyTransaction}
                    contactsData={contactsData}
                />
            </div>
            {openModal && (
                <TransferModal
                    onClose={handleCloseModal}
                    contact={openModal}
                    userData={userData}
                    userAuthentication={userAuthentication}
                    setLoading={setLoading}
                    setMessageTransfer={setMessageTransfer}
                    setHistoryTransaction={setHistoryTransaction}
                />
            )}
            {openModalContacts && (
                <MoreContactsTransfer
                    onClose={handleCloseModalContacts}
                    contacts={openModalContacts}
                    handleContactClick={handleContactClick}
                />
            )}
        </>
    );
}
