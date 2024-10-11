import React, { useState } from 'react';
import styles from './StartScreen.module.css';
import {Link} from "react-router-dom";

const StartScreen = ({ onStartGame }) => { // Accept the function as a prop
    const [difficulty, setDifficulty] = useState(0); // State to manage the local difficulty selection

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value); // Update local state
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        onStartGame(difficulty); // Call the parent function, passing the selected difficulty
    };

    return (
        <div className={styles.startScreen}>
            <h1>Welcome to Digits!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="difficulty-select">Select Difficulty:</label>
                <select id="difficulty-select" value={difficulty} onChange={handleDifficultyChange}>
                    <option value={2}>Expert</option>
                    <option value={1}>Advanced</option>
                    <option value={0}>Standard</option>
                    <option value={-1}>Kids 2</option>
                    <option value={-2}>Kids 1</option>
                    <option value={-3}>Testing</option>
                </select>
                <button type="submit" className={styles.startGameButton} >Start Game</button>
            </form>
            <p className={styles.guide}>
                <Link to="/info#howToPlay" className={styles.link}>How to Play</Link>
            </p>
        </div>
    );
};

export default StartScreen;
