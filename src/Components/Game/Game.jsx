import React, { useEffect, useRef, useState } from 'react';
import styles from './Game.module.css'
import { useGame } from "../../contexts/gameContext/gameContext";
import {useAuth} from "../../contexts/authContext";
import StartScreen from './Screens/StartScreen';
import RunIntroFirstScreen from './Screens/RunIntroFirstScreen';
import RunContinueScreen from './Screens/RunContinueScreen';
import ButtonScreen from './Screens/ButtonScreen';
import TrialContinueScreen from "./Screens/TrialContinueScreen";
import RunIntroSecondScreen from "./Screens/RunIntroSecondScreen";
import EndScreen from "./Screens/EndScreen";


const Game = () => {
    const canvasRef = useRef(null);
    const screenSet = useRef(null);
    const [gameState, setGameState] = useState('start');
    // 'start', 'runIntroFirst', 'passives', 'runContinue', 'number', 'button', 'trialContinue', 'runIntroSecond' or 'end'
    let updateCanvas = useRef(() => {});
    const [number, setNumber] = useState(-1);
    const [trialIter, setTrialIter] = useState(1);

    const { currentUser, userLoggedIn } = useAuth();
    const { sessionDifficulty,
        changeSessionDifficulty,
        endSession,
        runNumber,
        incrementRunNumber,
        getImageId } = useGame();

    const toggleFullScreen = () => {
        const canvas = screenSet.current;
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
        let width = winWidth/5 + (n*(winWidth-winWidth/5))/(maxN*2)
        let height = winHeight/4 + (n*(winHeight-winHeight/4))/(maxN*1.4)
        let paddingX = (winWidth-width)/2
        let paddingY = (winHeight-height)/2
        const radius = 120;
        const k = 4; // maximum number of samples before rejection
        const radius2 = radius * radius;
        const cellSize = radius * Math.SQRT1_2;
        const gridWidth = Math.ceil(width / cellSize);
        const gridHeight = Math.ceil(height / cellSize);
        const grid = new Array(gridWidth * gridHeight);
        const queue = [];
        let posVector = [];
        posVector.push({x: width / 2 + paddingX, y: height / 2 + paddingY});
        queue.push(sample(width / 2, height / 2,));
        let numBodies = 1;
        // Pick a random existing sample from the queue.
        pick: while (queue.length && numBodies < n) {
            const i = Math.random() * queue.length | 0;
            const parent = queue[i];
            const seed = Math.random();
            const epsilon = 0.0000001;

            // Make a new candidate.
            for (let j = 0; j < k; ++j) {
                const a = 2 * Math.PI * (seed + 1.0*j/k);
                const r = radius + epsilon;
                const x = parent[0] + r * Math.cos(a);
                const y = parent[1] + r * Math.sin(a);

                // Accept candidates that are inside the allowed extent
                // and farther than 2 * radius to all existing samples.
                if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
                    posVector.push({x: x+paddingX, y: y+paddingY});
                    //console.log("x: " + x + " y: " + y);
                    numBodies++;
                    queue.push(sample(x, y, parent));
                    continue pick;
                }
            }

            // If none of k candidates were accepted, remove it from the queue.
            const r = queue.pop();
            if (i < queue.length) queue[i] = r;
        }

        function far(x, y) {
            const i = x / cellSize | 0;
            const j = y / cellSize | 0;
            const i0 = Math.max(i - 2, 0);
            const j0 = Math.max(j - 2, 0);
            const i1 = Math.min(i + 3, gridWidth);
            const j1 = Math.min(j + 3, gridHeight);
            for (let j = j0; j < j1; ++j) {
                const o = j * gridWidth;
                for (let i = i0; i < i1; ++i) {
                    const s = grid[o + i];
                    if (s) {
                        const dx = s[0] - x;
                        const dy = s[1] - y;
                        if (dx * dx + dy * dy < radius2) return false;
                    }
                }
            }
            return true;
        }

        function sample(x, y) {
            const s = grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = [x, y];
            queue.push(s);
            return s;
        }
        setNumber(numBodies);
        console.log("n: ", n," Number of bodies: ", numBodies, " number: ", number);
        return posVector
    };

    //Initalitzation
    useEffect(() => {
        endSession();
    }, []);

    updateCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();  // Create a new Image object
        image.src = '/images/teddy.jpg';
        let imageSize = {x: 64, y: 64}
        let positions = randomNumbers(canvasRef.current.width, canvasRef.current.height, imageSize.x, imageSize.y)
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        image.onload = () => {
            for (let pos of positions) {
                context.drawImage(image, pos.x, pos.y, imageSize.x, imageSize.y);
            }
            setTimeout(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                setGameState('button')
            }, 1000);
        };
    };

    const handleButtonClick = (n) => () => {
        if(n === number) console.log("Correct");
        else console.log("Incorrect");
        console.log("Trial iter: ", trialIter);
        if (trialIter >= 5) { //28
            setTrialIter(1);
            console.log("Run number: ", runNumber);
            if (runNumber >= 3) setGameState('end'); //END
            else {
                setGameState('runIntroSecond');
                incrementRunNumber();
            }
        }
        else {
            setGameState('trialContinue');
            setTrialIter(trialIter+1);
        }
    };

    const handleStartGame = (selectedDifficulty) => {
        setGameState('runIntroFirst');
        toggleFullScreen();
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight+125;
        canvasRef.current.style.backgroundColor = '#CFCFCF';
        changeSessionDifficulty(selectedDifficulty);
    };

    const runIntroEnd = () => {
        console.log("passives");
        setGameState('runContinue');
        //updateCanvas();
    };

    const runContinueEnd = () => {
        setGameState('number');
        updateCanvas();
    };

    const handleKeyPress = (event) => {
        if (event.code === 'Space') {
            console.log("Pressed space, status: ", gameState);
            if (gameState === 'runIntroFirst' || gameState === 'runIntroSecond') {
                runIntroEnd();
            }
            if (gameState === 'runContinue' || gameState === 'trialContinue') {
                runContinueEnd();
            }
        }
    };

    useEffect(() => { //Keypress
        // Add the event listener for keypress
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameState]);

    //Resize
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
        //document.addEventListener('fullscreenchange', resizeCanvas);
        //window.addEventListener('resize', resizeCanvas);

        return () => {
            document.removeEventListener('fullscreenchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    // X'start', X'runIntroFirst', 'passives', X'runContinue', 'number', X'button', 'trialContinue', 'runIntroSecond' or 'end'

    return (
        <div ref={screenSet} className={document.fullscreenElement === screenSet.current? styles.canvasContainerFull : styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <div>
                {gameState === 'start' && <StartScreen onStartGame={handleStartGame}/>}
                {gameState === 'runIntroFirst' && <RunIntroFirstScreen/>}
                {gameState === 'runContinue' && <RunContinueScreen/>}
                {gameState === 'button' && <ButtonScreen onButtonClick={handleButtonClick} number={number}/>}
                {gameState === 'trialContinue' && <TrialContinueScreen/>}
                {gameState === 'runIntroSecond' && <RunIntroSecondScreen/>}
                {gameState === 'end' && <EndScreen/>}

            </div>
        </div>
    );

};

export default Game;
