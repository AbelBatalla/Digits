import React from "react";
import Game from "../Game/Game";
import { GameProvider } from "../../contexts/gameContext/gameContext";
import { useProfile } from "../../contexts/profileContext/profileContext";
import { useAuth } from "../../contexts/authContext/authContext";
import styles from "./Stats/Stats.module.css";
import { Link } from "react-router-dom";
import ProfileFormModal from "../Modal/ProfileFormModal";
import ProfileSelector from "../Profiles/ProfileSelector";

const Play = () => {
    const { activeProfile } = useProfile();
    const { userLoggedIn } = useAuth();
    return (
        <>
            <div className={styles.headerContainer}>
                <h1>Play</h1>
                <ProfileSelector/>
            </div>
            {userLoggedIn && (
                <div>
                    {!activeProfile && (
                        <div className={styles.container}>
                            <p className={styles.p}>
                                No active profile selected. Please&nbsp;</p>
                            <ProfileFormModal text={"create a profile"}/>
                            <p className={styles.p}>.</p>
                        </div>
                    )}
                    {activeProfile && (
                        <div>
                            <GameProvider>
                                <Game/>
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