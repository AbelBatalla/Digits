import React from "react";
import styles from "./Other.module.css";

const Other = () => {
    return (
        <>
            <h1>Other</h1>
            <div className={styles.howItWorksContent}>
                <h1 className={styles.howItWorksTitle}>How it Works</h1>

                <section className={styles.howItWorksSection}>
                    <p className={styles.howItWorksText}>
                        The “Digits” game trains users to map estimated quantities onto symbolic numbers, improving arithmetic skills. This practice enhances the accuracy in estimating quantities (without counting individual items) and strengthens the connection between intuitive estimation of quantities and their corresponding symbolic numbers, leading to significant improvements in arithmetic in a short time. The Digits game is effective because it bridges the gap between non-symbolic number sense and symbolic arithmetic, which is critical for developing higher-level math skills.
                    </p>
                </section>

                <section className={styles.howItWorksSection}>
                    <h2 className={styles.howItWorksSubtitle}>Scientific Insights</h2>
                    <p className={styles.howItWorksText}>
                        For more scientific insights into how and why the Digits game improves math performance, you can read the full study here:
                    </p>
                    <p className={`${styles.howItWorksText} ${styles.citation}`}>
                        Ferres-Forga, N., Halberda, J., Batalla-Ferres, A., & Bonatti, L. L. (2022). Improving Mathematics Performance in 7-Year-Old Children: Training the Mapping From Estimated Quantities to Arabic Digits. Journal of Numerical Cognition, 8(1), 123-147.
                        <a href="https://doi.org/10.5964/jnc.8075" target="_blank" className={styles.howItWorksLink}>https://doi.org/10.5964/jnc.8075</a>
                    </p>
                </section>

                <section className={styles.howItWorksSection}>
                    <h2 className={styles.howItWorksSubtitle}>Important Notice</h2>
                    <p className={styles.howItWorksText}>
                        It’s important to note that the version of the Digits game used in the scientific study (Ferres-Forga et al., 2022) was a highly restricted version, developed solely to explore whether directly training the mapping between estimated quantities and Arabic digits could improve math proficiency...
                    </p>
                </section>

                <section className={styles.howItWorksSection}>
                    <h2 className={styles.howItWorksSubtitle}>How to Play</h2>
                    <p className={styles.howItWorksText}>
                        To see results, it is recommended to play at least two sessions per week for four weeks. However, continued practice will further reinforce the link between estimating quantities and identifying the corresponding Arabic digits, ultimately improving arithmetic abilities.
                    </p>
                </section>

                <section className={styles.howItWorksSection}>
                    <h2 className={styles.howItWorksSubtitle}>Statistics and Progress</h2>
                    <p className={styles.howItWorksText}>
                        For players aged 6 and older, it is recommended to start with the standard level and remain in this level for at least four weeks (two sessions per week)...
                    </p>
                </section>

                <section className={styles.howItWorksSection}>
                    <h2 className={styles.howItWorksSubtitle}>Contact Us</h2>
                    <p className={styles.howItWorksText}>
                        If you have any questions, you can contact us at <a href="mailto:example@gmail.com" className={styles.howItWorksLink}>example@gmail.com</a>
                    </p>
                </section>
            </div>
        </>
    );
}
export default Other;