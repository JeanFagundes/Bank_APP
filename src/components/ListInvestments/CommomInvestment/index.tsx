import { useState } from 'react';
import styles from './commomInvestment.module.scss';
import { BiHelpCircle } from 'react-icons/bi';
import ValueToInvest from '../ValueToInvest';

export default function CommomInvestment() {
    const [selectedRange, setSetelectRange] = useState<number>(5);
    const year = 2;
    const futureBalance = '5.000.00';
    const investType = 'Prefixed treasury';

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSetelectRange(parseInt(event.target.value));
    };

    const getValueLabel = (value: number) => {
        switch (value) {
            case 0:
                return '1 Month';
            case 1:
                return '2 Months';
            case 2:
                return '3 Months';
            case 3:
                return '6 Months';
            case 4:
                return '12 Months';
            case 5:
                return '24 Months';
            case 6:
                return '60 Months';
            case 7:
                return '360 Months';
            default:
                return '';
        }
    };

    const selectMonths = getValueLabel(selectedRange);

    return (
        <div className={styles.container}>
            <div>
                <p>To begin with, what amount would you like to invest?</p>
                <ValueToInvest />
            </div>

            <div>
                <p>And per month, how much would you like to deposit?</p>
                <ValueToInvest />
            </div>

            <div className={styles.container__inputRange}>
                <p>How long would you keep your money invested?</p>
                <h2>{selectMonths}</h2>
                <input
                    type="range"
                    min="0"
                    max="7"
                    step="1"
                    value={selectedRange}
                    onChange={handleRangeChange}
                    className={styles.container__customRangeInput}
                />
            </div>

            <div className={styles.container__returnInvestment}>
                <p>In {selectMonths} years you would have </p>
                <h2>R$ {futureBalance}</h2>
            </div>

            <div className={styles.container__investmentInformation}>
                <p>Total invested: </p>
                <p>In saving, your money would yield: </p>
                <p>In the {investType}, your money would yield: </p>
            </div>

            <div className={styles.container__baseCalc}>
                <BiHelpCircle size={34} />
                <div>
                    <p>
                        Values used in the investment simulator (referring to the last
                        update date - these values may change according to the market):{' '}
                    </p>
                    <p>- Date of last update: 06/30/2022</p>
                    <p>- Profitability percentage of Savings: 0.50% p.m.</p>
                    <p>- Percentage of return on Fixed-rate Treasury: 13.08% p.a.</p>
                </div>
            </div>
        </div>
    );
}
