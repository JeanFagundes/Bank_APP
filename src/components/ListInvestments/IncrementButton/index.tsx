import { BiPlus } from 'react-icons/bi';
import { RxBorderSolid } from 'react-icons/rx';

interface IProps {
    value: number;
    setValue: (value: number) => void;
}

export default function IncrementButton({ value, setValue }: IProps) {
    const handleIncrement = () => {
        setValue(value + 250);
    };

    const handleDecrement = () => {
        setValue(value - 250);
    };

    return (
        <>
            <button onClick={handleDecrement}>
                <RxBorderSolid />
            </button>
            <button onClick={handleIncrement}>
                <BiPlus />
            </button>
        </>
    );
}
