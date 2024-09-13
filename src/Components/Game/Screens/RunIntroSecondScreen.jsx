import styles from './TextScreen.module.css';

const RunIntroSecondScreen = () => { // Accept the function as a prop
    return (
        <div className={styles.RunIntroFirstScreen}>
            <p className={styles.p}>Well done!
                <br></br>
                Please pay attention to the following quantities!
                <br></br>
                <br></br>
                Press [Space] to continue</p>
        </div>
    );
};

export default RunIntroSecondScreen;
