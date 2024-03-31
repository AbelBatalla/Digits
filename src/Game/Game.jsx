import React, { useEffect } from 'react';
import styles from './Game.module.css';


const Game = () => {
    useEffect(() => {
        const gameContainer = document.getElementById('gameContainer');
        const gameBox = document.getElementById('gameBox');
        const scoreDisplay = document.getElementById('score');
        const timeLeftDisplay = document.getElementById('timeLeft');
        let score = 0;
        let timeLeft = 10;

        gameBox.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            moveBox();
        });

        const moveBox = () => {
            const x = Math.floor(Math.random() * (gameContainer.offsetWidth - 50));
            const y = Math.floor(Math.random() * (gameContainer.offsetHeight - 50));
            gameBox.style.left = x + 'px';
            gameBox.style.top = y + 'px';
        };

        const countdown = () => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
            if (timeLeft === 0) {
                alert('Game over! Your score is: ' + score);
                clearInterval(timerId);
            }
        };

        let timerId = setInterval(countdown, 1000);
        moveBox();

        return () => clearInterval(timerId); // Cleanup on component unmount
    }, []);

    return (
        <div className={styles.gameContainer} id="gameContainer">
            <div id="gameBox" className={styles.gameBox}></div>
            <div id="scoreBoard">Score: <span id="score">0</span></div>
            <div id="timer">Time left: <span id="timeLeft">10</span> seconds</div>
        </div>
    );
};

export default Game;
