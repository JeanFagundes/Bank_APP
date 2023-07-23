import ListIvenstments from 'components/ListInvestments';
import styles from './Simulate.module.scss';
import { useState } from 'react';
import CommomInvestment from 'components/ListInvestments/CommomInvestment';

export default function Simulate() {
    const [selectedItem, setSelectedItem] = useState<string>('Prefixed Treasury');

    return (
        <div className={styles.container}>
            <ListIvenstments
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <CommomInvestment investType={selectedItem} />
        </div>
    );
}
