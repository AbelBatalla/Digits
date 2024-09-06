import styles from './TextScreen.module.css';

const EndScreen = () => { // Accept the function as a prop
    return (
        <div className={styles.RunIntroFirstScreen}>
            <p className={styles.p}>Well done!
                <br></br>
                You have finished this session!
                <br></br>
                You can see your performance in the Stats tab.
                <br></br>
                <br></br>
                Press [Space] to close</p>
        </div>
    );
};

export default EndScreen;
