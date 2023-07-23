import IncrementButton from '../IncrementButton';
import styles from './valueToInvest.module.scss';

interface IProps {
    value: number;
    setValue: (value: number) => void;
}
export default function ValueToInvest({ value, setValue }: IProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        let numericValue = inputValue.replace(/[^0-9.]/g, '');
        if (numericValue.length > 9) {
            numericValue = numericValue.slice(0, 9);
        }
        if (!isNaN(Number(numericValue))) {
            const formattedValue = Number(numericValue);
            setValue(Number(formattedValue));
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.container__spanAndValue}>
                <span>R$ </span>
                <input
                    type="text"
                    value={value.toLocaleString('en-US')}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.container__button}>
                <IncrementButton value={value} setValue={setValue} />
            </div>
        </div>
    );
}
