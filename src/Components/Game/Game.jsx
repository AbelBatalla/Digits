import React, { useEffect, useRef } from 'react';
import styles from './Game.module.css'
const Game = () => {
    const canvasRef = useRef(null);
    let animationFrameId;

    // Game state
    const game = {
        box: { x: 50, y: 50, size: 50, speed: 5 },
        score: 0,
        isRunning: true,
    };

    const toggleFullScreen = () => {
        const canvas = canvasRef.current;
        if (!document.fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.mozRequestFullScreen) { /* Firefox */
                canvas.mozRequestFullScreen();
            } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                canvas.webkitRequestFullscreen();
            } else if (canvas.msRequestFullscreen) { /* IE/Edge */
                canvas.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    };

    // Move the box to a new random location
    const moveBox = () => {
        const canvas = canvasRef.current;
        game.box.x = Math.random() * (canvas.width - game.box.size);
        game.box.y = Math.random() * (canvas.height - game.box.size);
    };

    // Check if the click is inside the box
    const checkClickInsideBox = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect(); // Gets the size of the element and its position relative to the viewport

        // Adjust mouse click position based on the canvas scale
        const x = (event.clientX - rect.left); // Adjusting for scale
        const y = (event.clientY - rect.top); // Adjusting for scale

        if (
            x > game.box.x &&
            x < game.box.x + game.box.size &&
            y > game.box.y &&
            y < game.box.y + game.box.size
        ) {
            game.score += 1;
            moveBox();
        }
    };

    // Game loop
    const updateGame = () => {
        if (!game.isRunning) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the box
        ctx.fillStyle = 'red';
        ctx.fillRect(game.box.x, game.box.y, game.box.size, game.box.size);

        // Draw the score
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${game.score}`, 10, 30);

        animationFrameId = requestAnimationFrame(updateGame);
    };

    useEffect(() => {
        const resizeCanvas = () => {
            if (document.fullscreenElement === canvasRef.current) {
                // When in fullscreen, resize canvas to fill screen
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            } else {
                // When exiting fullscreen, revert to original size
                canvasRef.current.width = 800; // Your default canvas width
                canvasRef.current.height = 500; // Your default canvas height
            }
        };
        document.addEventListener('fullscreenchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);

        moveBox();
        updateGame();

        const canvas = canvasRef.current;
        canvas.style.backgroundColor = 'beige'; // Or any color you prefer
        canvas.addEventListener('click', checkClickInsideBox);

        return () => {
            document.removeEventListener('fullscreenchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('click', checkClickInsideBox);
        };
    });

    return (
        <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} width="800" height="500"></canvas>
            <button className={styles.fullscreenButton} onClick={toggleFullScreen}>Fullscreen</button>
        </div>
    );

};

export default Game;
