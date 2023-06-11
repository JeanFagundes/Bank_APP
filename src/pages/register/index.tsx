import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Register.module.scss';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'types/User';
import { auth, db } from 'db/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function Register() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            return setErrorMessage('Passwords do not match');
        }

        if (cpf.length < 11) {
            return setErrorMessage('CPF não tem o tamanho exigido de 11 digitos');
        }

        async function cadastrarAuthenticator(email: string, senha: string) {
            const result = await createUserWithEmailAndPassword(auth, email, senha)
                .then((userCredentials) => {
                    const userUid = userCredentials.user.uid;
                    cadastrarFirestore(newUser, userUid);
                })
                .catch((error) => console.log(error));
            return result;
        }

        cadastrarAuthenticator(email, password);

        async function cadastrarFirestore(newUser: IUser, userUid: string) {
            const userRef = doc(collection(db, 'users'), userUid);
            await setDoc(userRef, newUser);
            return userRef;
        }

        const newUser: IUser = {
            name,
            cpf,
            email,
            password,
            cards: [],
        };
        navigate('/login');
    };

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleCpf = (event: ChangeEvent<HTMLInputElement>) => {
        setCpf(event.target.value);
    };
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const navigate = useNavigate();
    const primaryBackground = 'linear-gradient(to bottom, #fcffdf 0%, #f1fe87 100%)';

    return (
        <div className={styles.container}>
            <form className={styles.container__form} onSubmit={handleSubmit}>
                <h1>Register</h1>
                {errorMessage && (
                    <div className={styles.container__errorMessage}>
                        <p>{errorMessage}</p>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleName}
                    required
                />
                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={handleCpf}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm the Password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    required
                />
                <div className={styles.container__button}>
                    <Button
                        background={primaryBackground}
                        fontColor={'#272A32'}
                        onSubmit={handleSubmit}>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}
