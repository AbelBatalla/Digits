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

    //Initalitzation
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.style.backgroundColor = 'beige';
    }, []);

    /*
        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const image = new Image();
            image.src = '/images/teddy.jpg';
            console.log("Preparing to load");
            image.onload = () => {
                context.drawImage(image, 300, 300);
                console.log("Image painted");
            };

        }, []);
    */
        //Draw
        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const image = new Image();  // Create a new Image object
            image.src = '/images/teddy.jpg';

            const updateCanvas = () => {
                let positions = randomNumbers(canvasRef.current.width, canvasRef.current.height)
                // Clear the canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                for (let pos of positions) {
                    context.drawImage(image, pos.x, pos.y);
                }

            };

            let intervalId
            image.onload = () => {
                intervalId = setInterval(updateCanvas, 1000);  // Set interval only after the image is loaded
                console.log("Drawing " + intervalId)
            };
            return () => {
                clearInterval(intervalId);
            };
        }, []);

    useEffect(() => {
        const resizeCanvas = () => {
            if (document.fullscreenElement === canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            } else {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = 550;
            }
        };
        document.addEventListener('fullscreenchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            document.removeEventListener('fullscreenchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

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
