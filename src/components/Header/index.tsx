import styles from './Header.module.scss';
import logo from 'assets/imgs/logo.svg';
import avatar from 'assets/imgs/avatar.png';
import more from 'assets/imgs/more.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { useContext, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
    const { userData } = useContext(UserContext);
    const [configOpen, setConfigOpen] = useState(false);

    const navigate = useNavigate();
    function handleClick() {
        const rota = userData ? '/dashboard' : '/';
        navigate(rota);
    }

    function handleConfigClick() {
        setConfigOpen(!configOpen);
    }

    async function handleLogoutClick() {
        try {
            await signOut(getAuth()); // Chame o método signOut com getAuth()
            setConfigOpen(false);
            navigate('/'); // Redirecione para a página de login ou a página desejada após o logout
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    return (
        <nav className={styles.container}>
            <ul className={styles.container__list}>
                {userData === null ? (
                    <li className={styles.container__logo}></li>
                ) : (
                    <li>
                        <img src={avatar} alt="avatar" />
                    </li>
                )}
                <li onClick={handleClick}>
                    <img src={logo} alt="logo do banco" />
                </li>

                <li className={styles.container__menuContainer}>
                    <img src={more} alt="3 pontos" onClick={handleConfigClick} />
                </li>
                {configOpen && (
                    <ul className={styles.container__config}>
                        <li onClick={handleLogoutClick}>Logout</li>
                    </ul>
                )}
            </ul>
        </nav>
    );
}
