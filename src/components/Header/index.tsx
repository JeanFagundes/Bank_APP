import styles from './Header.module.scss';
import logo from 'assets/imgs/logo.svg';
import avatar from 'assets/imgs/avatar.png';
import more from 'assets/imgs/more.png';

export default function Header() {
    return (
        <nav className={styles.container}>
            <ul className={styles.container__list}>
                <li>
                    <img src={avatar} alt="avatar" />
                </li>
                <li>
                    <img src={logo} alt="logo do banco" />
                </li>
                <li>
                    <img src={more} alt="3 pontos" />
                </li>
            </ul>
        </nav>
    );
}
