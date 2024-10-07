import React from "react";
import styles from "./Home.module.css";

const Home = () => {
    return (
    <>
        <div className={styles.homepageContent}>
            <h1 className={styles.homepageTitle}>Home</h1>

            <p className={styles.homepageText}>
                Improve your mathematical abilities by training the mapping from estimated quantities to Arabic digits.
                This connection is essential because mathematical thinking involves both an intuitive sense of numbers,
                known as the Approximate Number System (ANS), and the precise symbolic system of Arabic digits used for
                arithmetic operations. Research shows that this type of training helps children improve their ability to
                perform symbolic additions and subtractions, offering benefits beyond regular practice. In particular,
                it enhances arithmetic abilities by building a more solid foundation in understanding and using numbers.
            </p>

            <p className={styles.homepageText}>
                If you’re an educator, parent, researcher, or student interested in enhancing math performance, you or
                your students/children/participants can play the Digits game for free here.
            </p>
        </div>
    </>
    )
};
export default Home;