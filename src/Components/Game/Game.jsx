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

    const randomNumbers = (winWidth, winHeight, imageWidth, imageHeight) => {
        let maxN = 24
        let n = Math.floor(Math.random() * (maxN))+1 //Num of images 0-25
        winHeight = winHeight - imageHeight
        winWidth = winWidth - imageWidth
        let width = winWidth/4 + (n*(winWidth-winWidth/4))/(maxN*2)
        let height = winHeight/3 + (n*(winHeight-winHeight/3))/(maxN*1.4)
        let paddingX = (winWidth - width) / 2
        let paddingY = (winHeight - height) / 2
        let numCellsX = n
        let numCellsY = 1
        while (numCellsX-numCellsY > 1) {
            ++numCellsY
            --numCellsX
        }
        while (numCellsX*numCellsY > 2*n) {
            --numCellsY
            --numCellsX
        }
        console.log("images/cells: " + n + "/" + numCellsY*numCellsX + "x: " + numCellsX + " y: " + numCellsY)
        console.log("winWidth" + winWidth + " winHeight" + winHeight + " width: " + width + " height: " + height + " paddingX: " + paddingX + " paddingY: " + paddingY)

        const cellWidth = width / numCellsX
        const cellHeight = height / numCellsY
        /*
        for (let i = 0; i <= n; i++) {
            let x = Math.floor(Math.random() * (width + 1));
            let y = Math.floor(Math.random() * (height + 1));
            posVector[i] = {x: x, y: y}
        }

         */
        let allPairs = [];
        for (let i = 0; i < numCellsX; i++) {
            for (let j = 0; j < numCellsY; j++) {
                allPairs.push({i: i, j: j});
            }
        }

        for (let i = allPairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allPairs[i], allPairs[j]] = [allPairs[j], allPairs[i]];
        }

        let selectedPairs = allPairs.slice(0, n);

        let posVector = [];
        for (let pair of selectedPairs) {
            let x = pair.i * cellWidth + paddingX + (cellWidth-imageWidth) * Math.random()
            let y = pair.j * cellHeight + paddingY + (cellHeight-imageHeight) * Math.random();
            posVector.push({x: x, y: y});
        }
                return posVector //[{x: 0, y: 0}, {x: width, y: height}, {x: width, y: 0}, {x: 0, y: height}]
    };

    //Initalitzation
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.style.backgroundColor = '#CFCFCF';
}, []);

/*
        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const image = new Image();
            image.src = '/images/teddy.jpg';
            console.log("Preparing to load");
            image.onload = () => {
                context.drawImage(image, 0, 0, 64, 64);
                console.log("Image painted");
            };

        }, []);
*/
        //Draw
        useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === 'f') {
                    updateCanvas();
                }
            };
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const image = new Image();  // Create a new Image object
            image.src = '/images/teddy.jpg';
            let imageSize = {x: 64, y: 64}

            const updateCanvas = () => {
                let positions = randomNumbers(canvasRef.current.width, canvasRef.current.height, imageSize.x, imageSize.y)
                // Clear the canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                for (let pos of positions) {
                    context.drawImage(image, pos.x, pos.y, imageSize.x, imageSize.y);
                }

            };

            let intervalId
            image.onload = () => {
                //intervalId = setInterval(updateCanvas, 10000);
                document.addEventListener('keydown', handleKeyDown);

                console.log("ready")
            };
            return () => {
                //clearInterval(intervalId);
                document.removeEventListener('keydown', handleKeyDown);

            };
        }, []);

    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                // Create a temporary canvas to store the current image
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = canvasRef.current.width;
                tempCanvas.height = canvasRef.current.height;

                // Copy the current canvas content to the temporary canvas
                tempCtx.drawImage(canvasRef.current, 0, 0);

                // Resize the original canvas
                if (document.fullscreenElement === canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                } else {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = 550;
                }

                // Restore the content from the temporary canvas back to the original canvas
                canvasRef.current.getContext('2d').drawImage(tempCanvas, 0, 0);
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
