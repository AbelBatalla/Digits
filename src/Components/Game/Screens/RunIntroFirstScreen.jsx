import styles from './RunIntroFirstScreen.module.css';

const RunIntroFirstScreen = () => { // Accept the function as a prop
    return (
        <div className={styles.RunIntroFirstScreen}>
            <p className={styles.p}>Hello,
                <br></br>
            Please pay attention to the following quantities!
                <br></br>
                <br></br>
            Press [Space] to continue</p>
        </div>
    );
};

export default RunIntroFirstScreen;
