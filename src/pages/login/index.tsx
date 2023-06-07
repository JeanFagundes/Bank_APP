/* eslint-disable react/no-unescaped-entities */
import Button from 'components/Button';
import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from 'context/AuthContext';
import { AuthContext } from 'context/IsAuthenticated';

export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { users } = useContext(UserContext);
    const authContext = useContext(AuthContext);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const user = users.find((user) => user.cpf === cpf);

        if (!user) {
            setPassword('');
            return setErrorMessage('Cpf não cadastrado');
        }
        if (user.password !== password) {
            setPassword('');
            return setErrorMessage('Senha invalida');
        }
        authContext?.setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setCpf(event.target.value);
    };
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();
    const primaryBackground = 'linear-gradient(to bottom, #fcffdf 0%, #f1fe87 100%)';

    return (
        <div className={styles.container}>
            <form className={styles.container__form} onSubmit={handleSubmit}>
                <h1>Login</h1>
                {errorMessage && (
                    <div className={styles.container__errorMessage}>
                        <p>{errorMessage}</p>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={handleLogin}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    required
                />
                <div className={styles.container__button}>
                    <Button
                        background={primaryBackground}
                        fontColor={'#272A32'}
                        onSubmit={handleSubmit}>
                        Login
                    </Button>
                </div>
            </form>
            <p className={styles.container__register}>
                Don't have an account ?
                <Link className={styles.container__link} to="/register">
                    Register
                </Link>
            </p>
        </div>
    );
}
