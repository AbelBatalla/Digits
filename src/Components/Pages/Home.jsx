import React from "react";
import styles from "./Home.module.css";
import {Link} from "react-router-dom";

const Home = () => {
    return (
    <>
        <div className={styles.homepageContent}>
            <h1 className={styles.homepageTitle}>Digits</h1>

            <p className={styles.homepageText}>
                The Digits game is based on scientific research and has been shown to be effective in improving math performance in children. It is a valuable tool for educators and parents who want to help children develop strong math skills.
            </p>

            <p className={styles.homepageText}>
                Improve your mathematical abilities by training the mapping from estimated quantities to Arabic digits. This connection is essential because mathematical thinking involves both an intuitive sense of numbers, known as the Approximate Number System (ANS), and the precise symbolic system of Arabic digits used for arithmetic operations. <a href="https://doi.org/10.5964/jnc.8075" target="_blank" rel="noopener noreferrer">Research</a> shows
                that this type of training helps children improve their ability to perform symbolic additions and
                subtractions, offering benefits beyond regular practice. In particular, it enhances arithmetic abilities by building a more solid foundation for understanding and using numbers. The game is designed to be engaging and effective, offering a fun way to improve math skills.
            </p>

            <p className={styles.homepageText}>
                If you’re an educator, parent, researcher or student interested in enhancing math performance, yourself, your students, children or participants can play the Digits game for free  <Link to="/digits">here</Link>. Please log in to access the game and track your progress.
            </p>
        </div>
    </>
    )
};
export default Home;