import styles from './TransferComponent.module.scss';
import { MdArrowBackIos } from 'react-icons/md';
import avatar from 'assets/imgs/avatar.png';
import { useNavigate } from 'react-router-dom';

export default function TransferComponent() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/dashboard');
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <MdArrowBackIos onClick={handleClick} />
                <p>Transfer</p>
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

            {/* Lista de contatos que estão salvos*/}
            <div className={styles.container__contacts}>
                <p>Contacts</p>
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
                        <p>Sister Alice</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
