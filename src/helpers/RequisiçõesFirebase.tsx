import { db } from 'db/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { IUserCardProps } from 'types/IUserCardProps';

interface IUserProps {
    userId: string;
}

export async function findCardUser({ userId }: IUserProps) {
    const cardRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cardRef);

    if (docSnap.get('cards').length === 0) {
        return false;
    }

    return true;
}

export async function addCardToUser({
    userId,
    cardNumber,
    expirationDate,
    balance,
    background,
}: IUserCardProps) {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    const userData = docSnap.exists() ? docSnap.data() : undefined;

    if (userData) {
        const updatedCards = [
            ...userData.cards,
            { cardNumber, expirationDate, balance, background },
        ];

        await updateDoc(userRef, { cards: updatedCards });

        console.log('Card Adicionado');
    } else {
        console.log('Documento não encontrado ou sem dados');
    }
}

export async function showCards({ userId }: IUserProps) {
    const cardRef = doc(db, 'users', userId);
    const docSnap = await getDoc(cardRef);

    const userCard = docSnap.get('cards');

    return userCard;
}
