import SubHeader from 'components/SubHeader';
import styles from './InvestmentComponent.module.scss';
import SimulateAndInvest from './SimulateAndInvest';
import { useState } from 'react';
import Simulate from './Simulate';

//input com Range para aumentar os meses de investimentos
{
    /* <input type="range" min="0" max="7" step="1" /> */
}
export default function InvestmentComponent() {
    const [selectedItem, setSelectedItem] = useState('');
    return (
        <div className={styles.container}>
            <div className={styles.container__content}>
                <SubHeader name={'Investment'}></SubHeader>
                <SimulateAndInvest
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
            </div>
            {selectedItem === 'simulate' ? <Simulate /> : 'invest'}
        </div>
    );
}
