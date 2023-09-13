import SubHeader from 'components/SubHeader';
import styles from './InvestmentComponent.module.scss';
import SimulateAndInvest from './SimulateAndInvest';
import Simulate from './Simulate';

export default function InvestmentComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.container__content}>
                <SubHeader name={'Investment'}></SubHeader>
                <SimulateAndInvest />
            </div>
            <Simulate />
        </div>
    );
}
