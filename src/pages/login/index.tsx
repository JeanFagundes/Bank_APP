/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import Button from 'components/Button';
import styles from './Login.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'db/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        async function login(email: string, password: string) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/dashboard');
            } catch (error: any) {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    setErrorMessage('Wrong email or password.');
                } else {
                    setErrorMessage(errorMessage);
                }
            }
        }
        login(email, password);
    };

    const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

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
                    placeholder="Email"
                    value={email}
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
