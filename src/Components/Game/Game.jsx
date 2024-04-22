import React, { useEffect, useRef } from 'react';
import styles from './Game.module.css'
const Game = () => {
    const canvasRef = useRef(null);
    let animationFrameId;

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

    const randomNumbers = (width, height) => {
        let n = Math.floor(Math.random() * (30 + 1))
        let posVector = []
        for (let i = 0; i <= n; i++) {
            let x = Math.floor(Math.random() * (width + 1));
            let y = Math.floor(Math.random() * (height + 1));
            posVector[i] = {x: x, y: y}
        }
        return posVector
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const updateCanvas = () => {
            let positions = randomNumbers(canvasRef.current.width, canvasRef.current.height)
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let pos of positions) {
                context.fillStyle = "blue";
                context.fillRect(pos.x, pos.y, 50, 50);
            }
        };

        const intervalId = setInterval(updateCanvas, 1000); // Call updateCanvas every second

        // Cleanup on unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []); // Empty dependency array ensures this effect only runs once

    useEffect(() => {
        const resizeCanvas = () => {
            if (document.fullscreenElement === canvasRef.current) {
                // When in fullscreen, resize canvas to fill screen
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            } else {
                // When exiting fullscreen, revert to original size
                canvasRef.current.width = window.innerWidth; // Your default canvas width
                canvasRef.current.height = 550; // Your default canvas height
            }
        };
        document.addEventListener('fullscreenchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);


        const canvas = canvasRef.current;
        canvas.style.backgroundColor = 'beige'; // Or any color you prefer

        return () => {
            document.removeEventListener('fullscreenchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);};
    });

    return (
        <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} width={window.innerWidth} height ={"550"}></canvas>
            <div className={styles.overlay}>
                <button className={styles.fullscreenButton} onClick={toggleFullScreen}>Fullscreen</button>
                <button className={[styles.numberButton, false ? styles.active : styles.hidden].join(' ')}>NUMBER</button>

            </div>
        </div>
    );

};

export default Game;
