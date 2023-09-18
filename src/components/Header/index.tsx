import styles from './Header.module.scss';
import logo from 'assets/imgs/logo.svg';
import avatar from 'assets/imgs/do-utilizador.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'db/firebase';

export default function Header() {
    const { userData, setUserData } = useContext(UserContext);

    const navigate = useNavigate();
    function handleClick() {
        const rota = userData ? '/dashboard' : '/';
        navigate(rota);
    }

    async function handleLogoutClick() {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
            try {
                setUserData(null);
                await signOut(auth); // Chame o método signOut com getAuth()
                navigate('/'); // Redirecione para a página de login ou a página desejada após o logout
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
        }
    }

    return (
        <nav className={styles.container}>
            <ul className={styles.container__list}>
                {userData === null ? (
                    <li className={styles.container__logo}>hihi</li>
                ) : (
                    <li>
                        <img src={avatar} alt="avatar" width={24} />
                    </li>
                )}
                <li onClick={handleClick}>
                    <img src={logo} alt="logo do banco" />
                </li>

                <li>{userData && <p onClick={handleLogoutClick}>Logout</p>}</li>
            </ul>
        </nav>
    );
}
