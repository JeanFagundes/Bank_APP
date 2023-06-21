import styles from './SimulateAndInvest.module.scss';

interface IProps {
    selectedItem: string;
    setSelectedItem: (item: string) => void;
}

export default function SimulateAndInvest({ selectedItem, setSelectedItem }: IProps) {
    const handleItemClick = (item: string) => {
        setSelectedItem(item);
    };
    return (
        <div className={styles.container}>
            <div className={styles.container__content}>
                <h2
                    className={
                        selectedItem === 'simulate' ? styles.container__selected : ''
                    }
                    onClick={() => handleItemClick('simulate')}>
                    Simulate
                </h2>
                <h2
                    className={
                        selectedItem === 'invest' ? styles.container__selected : ''
                    }
                    onClick={() => handleItemClick('invest')}>
                    Invest
                </h2>
            </div>
        </div>
    );
}
