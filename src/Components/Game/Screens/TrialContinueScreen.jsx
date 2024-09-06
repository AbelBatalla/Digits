import styles from './TextScreen.module.css';

const TrialContinueScreen = () => { // Accept the function as a prop
    return (
        <div className={styles.RunIntroFirstScreen}>
            <p className={styles.p}>Press [Space] to continue</p>
        </div>
    );
};

export default TrialContinueScreen;
