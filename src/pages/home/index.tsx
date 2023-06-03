import styles from './Home.module.scss';
import logo from 'assets/imgs/logo.svg';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const primaryBackground = 'linear-gradient(to bottom, #fcffdf 0%, #f1fe87 100%)';
    const secondaryBackground = '#363339';

    const navigate = useNavigate();

    const handleClick = (rota: string) => {
        navigate(rota);
    };

    return (
        <div className={styles.container}>
            <div className={styles.container__logo}>
                <img src={logo} alt="logo do banco" />
            </div>
            <div className={styles.container__buttons}>
                <Button
                    handleClick={() => handleClick('/login')}
                    background={primaryBackground}
                    fontColor={'#272A32'}>
                    Log in
                </Button>
                <Button
                    handleClick={() => handleClick('/register')}
                    background={secondaryBackground}
                    fontColor={'#ffffff'}>
                    Become a client of the bank
                </Button>
            </div>
        </div>
    );
}
