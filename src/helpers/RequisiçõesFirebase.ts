import { db } from 'db/firebase';
import {
    DocumentReference,
    FieldValue,
    arrayUnion,
    doc,
    getDoc,
    increment,
    setDoc,
    updateDoc,
    deleteField,
} from 'firebase/firestore';
import { ICard } from 'types/Card';
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

export async function increaseBalance(userId: string) {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    // const userData = await docSnap.get('cards');
    const userData = docSnap.get('cards');

    const updatedCards = userData.map((card: ICard) => {
        if (typeof card.balance === 'number') {
            console.log(typeof card.balance);
            const updatedBalance = card.balance + 50;
            const updatedBalanceConvert = Number(updatedBalance);
            return { ...card, balance: updatedBalanceConvert };
        }
        return card;
    });

    console.log(updatedCards);

    // Delete the old 'cards' field from the document
    await setDoc(userRef, { cards: deleteField() }, { merge: true });

    // Add the updated 'cards' field back to the document
    await setDoc(userRef, { cards: arrayUnion(...updatedCards) }, { merge: true });
}
