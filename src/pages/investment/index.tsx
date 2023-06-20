import InvestmentComponent from 'components/ListFinance/InvestmentComponent';
import styles from './Investment.module.scss';

export default function Investment() {
    return (
        <div className={styles.container}>
            <InvestmentComponent />
        </div>
    );
}
