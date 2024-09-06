import styles from './RunIntroFirstScreen.module.css';

const RunContinueScreen = () => { // Accept the function as a prop
    return (
        <div className={styles.RunIntroFirstScreen}>
            <p className={styles.p}>Let's play!,
                <br></br>
                How many objects are there?
                <br></br>
                <br></br>
                Press [Space] to continue</p>
        </div>
    );
};

export default RunContinueScreen;
