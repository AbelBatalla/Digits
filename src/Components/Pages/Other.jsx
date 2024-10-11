import React, { useEffect, useRef } from "react";
import styles from "./Other.module.css";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing icons from react-icons

const Other = () => {
    const correctSound = useRef(new Audio('/sounds/correct.mp3'));
    const incorrectSound = useRef(new Audio('/sounds/incorrect.mp3'));

    const playCorrectSound = () => {
        if (correctSound.current) {
            correctSound.current.play().then(r => {});
        }
    };

    const playIncorrectSound = () => {
        if (incorrectSound.current) {
            incorrectSound.current.play().then(r => {});
        }
    };

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    return (
        <>
            <div className={styles.homepageContent}>
                <h1 className={styles.homepageSubTitle}>How it Works</h1>
                <div className={styles.homepageText}>
                    <p className={styles.homepageParagraph}>
                        The Digits game trains users to map estimated quantities onto symbolic numbers, improving
                        arithmetic skills. This practice enhances the accuracy in estimating quantities (without
                        counting individual items) and strengthens the connection between intuitive estimation of quantities and
                        their corresponding symbolic numbers, leading to significant improvements in arithmetic in a
                        short time. The Digits game is effective because it bridges the gap between non-symbolic number sense
                        and symbolic arithmetic, which is critical for developing higher-level math skills.
                    </p>
                    <p className={styles.homepageParagraph}>
                    For more scientific insights into how and why the Digits game improves math performance, you can
                    read the full study here:
                    <br></br>
                    Ferres-Forga, N., Halberda, J., Batalla-Ferres, A., & Bonatti, L. L. (2022). Improving Mathematics
                    Performance in 7-Year-Old Children: Training the Mapping From Estimated Quantities to Arabic Digits.
                    Journal of Numerical Cognition, 8(1), 123-147. https://doi.org/10.5964/jnc.8075
                    </p>

                    <h1 className={styles.homepageSubSubTitle}>Important Notice</h1>
                    <p className={styles.homepageParagraph}>
                    It’s important to note that the version of the Digits game used in the scientific study
                    (Ferres-Forga et al., 2022) was a highly restricted version, developed solely to explore whether
                    directly training the mapping between estimated quantities and Arabic digits could improve math
                    proficiency. The limitations of the study version included a fixed number of sessions (only 8 were
                    created) and the use of static images for the collections of items. There were no different levels,
                    as it was specifically designed for 7 to 8 year-olds. In fact, considering the narrow scope of the
                    study’s requirements, the game wasn’t even programmed with a complex computer language, but rather
                    through a graphical interface to simplify its creation.
                    </p>
                    <p className={styles.homepageParagraph}>
                    In contrast, the version of Digits presented here has been fully programmed to allow for unlimited
                    practice sessions and is suitable for different age groups. It features dynamically generated
                    images, all while adhering to the same scientific principles that activate the Approximate Number
                    System (ANS).
                    </p>
                </div>
                <h1 id="howToPlay" className={styles.homepageSubTitle}>How to Play</h1>
                <div className={styles.homepageText}>
                    <p className={styles.homepageParagraph}>
                        To see results, it is recommended to play at least two sessions per week for four weeks.
                        However, continued practice will further reinforce the link between estimating quantities and identifying
                        the corresponding Arabic digits, ultimately improving arithmetic abilities.
                    </p>
                    <p className={styles.homepageParagraph}>
                        Each session takes approximately 15-20 minutes to complete. Both speed and accuracy are
                        important, and the game will vary in difficulty during a session. Players will receive
                        auditory feedback after each response to reinforce learning.
                    </p>
                    <p className={styles.homepageParagraph}>
                        In the Statistics tab, you can track your performance throughout your different sessions as
                        well as a chart to visualize your progress.
                    </p>
                    <h1 className={styles.homepageSubSubTitle}>Profiles</h1>
                    <p className={styles.homepageParagraph}>
                        An account can have several profiles to track and visualize the progress of different users.
                        <br></br>
                        Before playing the game, make sure to have the adequate profile selected. This way, the statistics
                        can remain independent for each user.
                    </p>

                    <h1 className={styles.homepageSubSubTitle}>Game Structure</h1>
                    <p className={styles.homepageParagraph}>
                        The game starts with passive trials, where players observe collections of items on screen while
                        hearing the corresponding number. No response is required at this stage.
                    </p>
                    <p className={styles.homepageParagraph}>
                        After the passive trials, active trials begin. In these trials, a brief display of items appears
                        on the screen for one second, followed by three Arabic digits. Players must select the digit that
                        corresponds to the number of items just seen by clicking on it. Correct answers trigger this
                        sound
                        <FaCheckCircle
                        className={styles.icon}
                        onClick={playCorrectSound}
                        title="Correct sound"
                        style={{ cursor: 'pointer', marginLeft: '5px' }}
                        />
                        , while incorrect answers will trigger this other
                        <FaTimesCircle
                        className={styles.icon}
                        onClick={playIncorrectSound}
                        title="Incorrect sound"
                        style={{ cursor: 'pointer', marginLeft: '5px' }}
                        />.
                    </p>
                    <p className={styles.homepageParagraph}>
                        Each session contains 3 runs composed of 5 to 7 passive trials followed by 10 to 28 active
                        trials, depending on the selected difficulty. The difficulty escalates within each run, as the
                        number of items on the screen becomes larger. Additionally, the difficulty increases between runs as the
                        distance between the three digits becomes smaller, requiring more accuracy in estimation.
                    </p>
                    <h1 className={styles.homepageSubSubTitle}>Difficulty Selection</h1>
                    <p className={styles.homepageParagraph}>
                        For players aged 6 and older, it is recommended to start with the standard level and remain in
                        this level for at least four weeks (two sessions per week). In the Statistics tab, you can track
                        your performance throughout the game. After completing at least eight sessions, if you consider
                        advancing from standard to advanced level (though you can stay at standard level as long as you prefer),
                        check the statistics from your last session. If the percentage of correct answers in the last run is
                        below 33% (chance level), or if the percentage of correct answers in the overall session is below
                        50%, it is recommended to remain at the standard level.
                    </p>
                    <p className={styles.homepageListIntro}>
                        For children younger than 6, there are two different levels:
                    </p>
                    <ul className={styles.homepageList}>
                        <li className={styles.homepageListItem}>
                            <strong className={styles.homepageListItemTitle}>Kids 1 Level</strong>
                            <br></br>
                            To practice at this level, the child must be able to correctly associate
                            number words (e.g., one, two, three, four—spoken, not written) with their corresponding
                            figures (1, 2, 3, 4, ...) for numbers from 1 to 10. Reading the number words is not necessary,
                            only recognizing them when spoken. Understanding the actual meaning of these numbers is
                            also not required.
                        </li>
                        <li className={styles.homepageListItem}>
                            <strong className={styles.homepageListItemTitle}>Kids 2 Level</strong>
                            <br></br>
                            To practice at this level, the child must be able to correctly associate
                            number words (e.g., one, two, three, four—spoken, not written) with their corresponding
                            figures (1, 2, 3, 4, ...) for numbers from 1 to 15. Reading the number words is not necessary,
                            only recognizing them when spoken. Understanding the actual meaning of these numbers is
                            also not required.
                        </li>
                    </ul>
                    <p className={styles.homepageParagraph}>
                        Statistics are available for all levels.
                    </p>
                </div>
                <div className={styles.homepageText}>
                    <p className={styles.homepageParagraph}>
                        If you have any questions, you may contact us at abel.batalla@estudiantat.upc.edu
                    </p>
                </div>
            </div>
        </>
    );
}
export default Other;