import styles from './TransferComponent.module.scss';
import avatar from 'assets/imgs/avatar.png';
import SubHeader from 'components/SubHeader';
import Contacts from './Contacts';

export default function TransferComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.container__subHeader}>
                <SubHeader name={'Transfer'} />
            </div>
            <div className={styles.container__title}>
                <p>Balance</p>
                <h3>R$ 7,896</h3>
            </div>

            {/* Lista de contatos no card, no maximo 3 e 1 para adicionais*/}
            <div className={styles.container__card}>
                <p>Send money to</p>
                <ul>
                    <li>
                        <img src={avatar} alt="avatar" />
                        <p>John</p>
                    </li>
                    <li>
                        <img src={avatar} alt="avatar" />
                        <p>Jeniffer</p>
                    </li>
                    <li>
                        <img src={avatar} alt="avatar" />
                        <p>Maya</p>
                    </li>
                    <li>
                        <img src={avatar} alt="avatar" />
                        <p>Send</p>
                    </li>
                </ul>
            </div>

            <Contacts />
        </div>
    );
}
