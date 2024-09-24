import React from "react";
import Game from "../Game/Game";
import { GameProvider } from "../../contexts/gameContext/gameContext";
import { useProfile } from "../../contexts/profileContext/profileContext";
import { useAuth } from "../../contexts/authContext/authContext";
import styles from "./Stats/Stats.module.css";
import { Link } from "react-router-dom";

const Play = () => {
    const { activeProfile } = useProfile();
    const { userLoggedIn } = useAuth();
    return (
        <>
            <h1>Play</h1>
            {userLoggedIn && (
                <div>
                    {!activeProfile && (
                        <div className={styles.container}>
                            <p className={styles.p}>
                                No active profile selected. Please
                                <Link to="/login" className={styles.linkEnd}>create a profile</Link>
                                .
                            </p>
                        </div>
                    )}
                    {activeProfile && (
                        <div>
                            <GameProvider>
                                <Game />
                            </GameProvider>
                        </div>
                    )}
                </div>
            )}
            {!userLoggedIn && (
                <div className={styles.container}>
                    <p className={styles.p}>
                        <Link to="/login" className={styles.link}>Log in</Link>
                        to view your stats.
                    </p>
                </div>
            )}
        </>
    );
};
export default Play;