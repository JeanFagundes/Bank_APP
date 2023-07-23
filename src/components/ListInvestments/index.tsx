import styles from './ListIvenstments.module.scss';

interface IProps {
    selectedItem: string;
    setSelectedItem: (value: string) => void;
}
export default function ListIvenstments({ selectedItem, setSelectedItem }: IProps) {
    const items = [
        { id: 1, name: 'Prefixed Treasury' },
        { id: 3, name: 'Treasury IPCA+' },
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
                            selectedItem === item.name ? styles.container__selected : ''
                        }`}
                        onClick={() => setSelectedItem(item.name)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
