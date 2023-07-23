import { useState } from 'react';
import styles from './commomInvestment.module.scss';
import { BiHelpCircle } from 'react-icons/bi';
import ValueToInvest from '../ValueToInvest';

interface IProps {
    investType: string;
}

export default function CommomInvestment({ investType }: IProps) {
    const [selectedRange, setSetelectRange] = useState<number>(5);
    const [initialValue, setInitialValue] = useState(5250);
    const [monthValue, setMonthValue] = useState(300);

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

    const profitInvestment = (months: number, annualInterestRate: number) => {
        annualInterestRate = Math.pow(1 + annualInterestRate, 1 / 12) - 1;
        const result =
            initialValue * Math.pow(1 + annualInterestRate, months) +
            monthValue *
                ((Math.pow(1 + annualInterestRate, months) - 1) / annualInterestRate);
        return result;
    };

    const investment = () => {
        const month = selectMonths.split(' ')[0];
        const months = Number(month);

        const totalInvest = initialValue + months * monthValue;
        const resultInvestment = profitInvestment(months, 0.1308);
        const resultSavingInvestment = profitInvestment(months, 0.061) - totalInvest;
        const resultInvestmentProfit = resultInvestment - totalInvest;

        return [
            resultInvestment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
            totalInvest.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
            resultSavingInvestment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
            resultInvestmentProfit.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        ];
    };

    const [
        totalValueInvest,
        totalInvest,
        resultSavingInvestment,
        resultInvestmentProfit,
    ] = investment();

    return (
        <div className={styles.container}>
            <div>
                <p>To begin with, what amount would you like to invest?</p>
                <ValueToInvest value={initialValue} setValue={setInitialValue} />
            </div>

            <div>
                <p>And per month, how much would you like to deposit?</p>
                <ValueToInvest value={monthValue} setValue={setMonthValue} />
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
                <h2>
                    R$
                    {totalValueInvest}
                </h2>
            </div>

            <div className={styles.container__investmentInformation}>
                <p>Total invested: {totalInvest}</p>
                <p>In saving, your money would yield: {resultSavingInvestment}</p>
                <p>
                    In the {investType}, your money would yield: {resultInvestmentProfit}
                </p>
            </div>

            <div className={styles.container__baseCalc}>
                <BiHelpCircle size={34} />
                <div>
                    <p>
                        Values used in the investment simulator (referring to the last
                        update date - these values may change according to the market):{' '}
                    </p>
                    <p>- Date of last update: 30/06/2022</p>
                    <p>- Profitability percentage of Savings: 0.50% p.m.</p>
                    <p>- Percentage of return on Fixed-rate Treasury: 13.08% p.a.</p>
                </div>
            </div>
        </div>
    );
}
