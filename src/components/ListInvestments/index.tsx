import styles from './ListIvenstments.module.scss';

interface IProps {
    selectedItem: number | null;
    setSelectedItem: (value: number | null) => void;
}
export default function ListIvenstments({ selectedItem, setSelectedItem }: IProps) {
    const items = [
        { id: 1, name: 'Tesouro Prefixado' },
        { id: 2, name: 'Tesouro Selic' },
        { id: 3, name: 'Tesouro IPCA+' },
        { id: 4, name: 'CDB e LC' },
        { id: 5, name: 'LCI e LCA' },
    ];

    return (
        <div className={styles.container}>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={`${styles.container__item} ${
                            selectedItem === item.id ? styles.container__selected : ''
                        }`}
                        onClick={() => setSelectedItem(item.id)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
