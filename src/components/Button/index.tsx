import { ReactNode, FormEvent } from 'react';
import styles from './Button.module.scss';
interface IProps {
    children: ReactNode;
    background: string;
    fontColor: string;
    handleClick?: () => void;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}
export default function Button({
    children,
    background,
    fontColor = '',
    handleClick,
}: IProps) {
    return (
        <button
            onClick={handleClick}
            className={styles.button}
            style={{ background, color: fontColor }}>
            {children}
        </button>
    );
}
