import React, { useEffect, useRef, useState } from 'react';
import styles from './Game.module.css'
import { useGame } from "../../contexts/gameContext/gameContext";
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
    //GAME STATES: 'start', 'runIntroFirst', 'passives', 'runContinue', 'number', 'button', 'trialContinue', 'runIntroSecond' or 'end'
    let updateCanvasTrial = useRef(() => {});
    let updateCanvasPassive = useRef(() => {});
    let numbersToDisplay = useRef([]);
    const [number, setNumber] = useState(-1);
    const [trialIter, setTrialIter] = useState(1);
    const imageId = useRef(0);
    const correctSound = useRef(new Audio('/sounds/correct.mp3'));
    const incorrectSound = useRef(new Audio('/sounds/incorrect.mp3'));
    const timeouts = useRef([]);

    const { sessionDifficulty,
        changeSessionDifficulty,
        endSession, resetSession,
        runNumber,
        incrementRunNumber,
        trialData,
        endRun,
        getImageId } = useGame();

    const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
            console.log("Exited fullscreen, reloading the page...");
            //window.location.reload(); // Reload the page when fullscreen is exited
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvasRef.current.style.backgroundColor = '#FFFFFF';
            timeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
            timeouts.current = [];
            resetSession();
            setNumber(-1);
            setTrialIter(1);
            setGameState('start');
        }
    };

    //Initalitzation
    useEffect(() => {
        resetSession();
    }, []);

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

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
    }; //NOT USED

    const randomNumbers = (winWidth, winHeight, imageWidth, imageHeight, n = 0) => {
        winHeight = winHeight - imageHeight
        winWidth = winWidth - imageWidth
        const radius = 110;
        const k = 10; // maximum number of samples before rejection
        const radius2 = radius * radius;
        const cellSize = radius * Math.SQRT1_2;
        const gridWidth = Math.ceil(winWidth / cellSize);
        const gridHeight = Math.ceil(winHeight / cellSize);
        const grid = new Array(gridWidth * gridHeight);
        const queue = [];
        let pointsWithDistances = [];
        const centerX = winWidth / 2;
        const centerY = winHeight / 2;

        const startX = Math.random() * winWidth;
        const startY = Math.random() * winHeight;
        const distance = distanceFromCenter(startX, startY);
        pointsWithDistances.push({x: startX, y: startY, distance: distance});
        sample(startX, startY);

        pick: while (queue.length) {
            const i = Math.random() * queue.length | 0;
            const parent = queue[i];
            const seed = Math.random();
            const epsilon = 0.0000001;

            // Make a new candidate.
            for (let j = 0; j < k; ++j) {
                const a = 2 * Math.PI * (seed + j / k);
                const r = radius + epsilon;
                const x = parent[0] + r * Math.cos(a);
                const y = parent[1] + r * Math.sin(a);

                // Accept candidates that are inside the allowed extent
                // and farther than 2 * radius to all existing samples.
                if (0 <= x && x < winWidth && 0 <= y && y < winHeight && far(x, y)) {
                    const distance = distanceFromCenter(x, y);
                    pointsWithDistances.push({x, y, distance});
                    sample(x, y);
                    continue pick;
                }
            }

            // If none of k candidates were accepted, remove it from the queue.
            const r = queue.pop();
            if (i < queue.length) queue[i] = r;
        }

        function distanceFromCenter(x, y) {
            const dx = (x - centerX) * 0.7;
            const dy = y - centerY;
            return Math.sqrt(dx * dx + dy * dy);
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

        if (n === 0) n = Math.floor(Math.random() * (30)) + 1;
        pointsWithDistances.sort((a, b) => a.distance - b.distance);
        if (pointsWithDistances.some(point => point.x === undefined || point.y === undefined)) {
            console.error("There are points with undefined values in pointsWithDistances. Removing them...");
            pointsWithDistances = pointsWithDistances.filter(point => point.x !== undefined && point.y !== undefined);
        }
        const closestPoints = pointsWithDistances.slice(0, n);
        console.log("Points: ", n);
        setNumber(n);
        return closestPoints.map(point => ({ x: point.x, y: point.y }));
    };

    updateCanvasTrial = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = `/images/${imageId.current}.jpg`;
        let imageSize = {x: 64, y: 64}
        let positions = randomNumbers(canvasRef.current.width, canvasRef.current.height, imageSize.x, imageSize.y, numbersToDisplay.current[trialIter-1]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        image.onload = () => {
            for (let pos of positions) {
                context.drawImage(image, pos.x, pos.y, imageSize.x, imageSize.y);
            }
            const timeoutId = setTimeout(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                setGameState('button')
            }, 1000);
            timeouts.current.push(timeoutId);
        };
    };

    updateCanvasPassive = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = `/images/${imageId.current}.jpg`;
        let imageSize = {x: 64, y: 64}
        let currentIteration = 0;
        let passiveNumbers = [];

        if (sessionDifficulty === 0) {
            switch (runNumber) {
                case 1:
                    passiveNumbers = [15, 16, 17, 18, 19, 20, 21];
                    break;
                case 2:
                    passiveNumbers = [8, 9, 10, 11, 12, 13, 14];
                    break;
                case 3:
                    passiveNumbers = [1, 2, 3, 4, 5, 6, 7];
                    break;
            }
        } else if (sessionDifficulty === 1) {
            switch (runNumber) {
                case 1:
                    passiveNumbers = [20, 21, 22, 23, 24, 25, 26];
                    break;
                case 2:
                    passiveNumbers = [12, 13, 14, 15, 17, 18, 19];
                    break;
                case 3:
                    passiveNumbers = [5, 6, 7, 8, 9, 10, 11];
                    break;
            }
        } else if (sessionDifficulty === 2) {
            switch (runNumber) {
                case 1:
                    passiveNumbers = [24, 25, 26, 27, 28, 29, 30];
                    break;
                case 2:
                    passiveNumbers = [17, 18, 19, 20, 21, 22, 23];
                    break;
                case 3:
                    passiveNumbers = [10, 11, 12, 13, 14, 15, 16];
                    break;
            }
        } else if (sessionDifficulty === -1) {
            switch (runNumber) {
                case 1:
                    passiveNumbers = [11, 12, 13, 14, 15];
                    break;
                case 2:
                    passiveNumbers = [6, 7, 8, 9, 10];
                    break;
                case 3:
                    passiveNumbers = [1, 2, 3, 4, 5];
                    break;
            }
        } else if (sessionDifficulty === -2) {
            switch (runNumber) {
                case 1:
                    passiveNumbers = [6, 7, 8, 9, 10];
                    break;
                case 2:
                    passiveNumbers = [1, 2, 3, 4, 5];
                    break;
            }
        }

        passiveNumbers.sort(() => Math.random() - 0.5);

        let numberSound = [];

        console.log("Passive numbers: ", passiveNumbers);
        for (let i = 0; i <= passiveNumbers.length - 1; i++) {
            numberSound.push(new Audio(`/sounds/${passiveNumbers[i]}.mp3`));
            console.log("loaded: ", passiveNumbers[i]);
        }

        function executeIteration() {
            if (((currentIteration < 7 && sessionDifficulty >= 0) || (currentIteration < 5 && sessionDifficulty < 0)) && !(sessionDifficulty === -3)) {
                currentIteration++;
                if (numberSound[currentIteration-1]) numberSound[currentIteration-1].play();
                let positions = randomNumbers(canvasRef.current.width, canvasRef.current.height, imageSize.x, imageSize.y, passiveNumbers[currentIteration-1]);
                context.clearRect(0, 0, canvas.width, canvas.height);
                for (let pos of positions) {
                    context.drawImage(image, pos.x, pos.y, imageSize.x, imageSize.y);
                }
                const timeoutId = setTimeout(executeIteration, 1200);
                timeouts.current.push(timeoutId);
            }
            else {
                context.clearRect(0, 0, canvas.width, canvas.height);
                getNumbersToDisplay();
                setGameState('runContinue');
            }
        }
        image.onload = () => {
            executeIteration();
        }
    };

    const getNumbersToDisplay = () => {
        function sectionScramble(arr, n) {
            let arrays = [];
            const length = Math.floor(arr.length / n);
            arrays.push(arr.slice(0, length));
            for (let j = 1; j < n - 1; j++) {
                arrays.push(arr.slice(j * length, (j + 1) * length));
            }
            arrays.push(arr.slice((n - 1) * length));
            for (let i = 0; i < arrays.length; i++) {
                arrays[i].sort(() => Math.random() - 0.5);
            }
            let result = [];
            for (let i = 0; i < arrays.length; i++) {
                result = result.concat(arrays[i]);
            }
            return result;
        }

        function duplicateElements(arr, n) {
            if (n > arr.length) {
                n = arr.length;
            }

            const uniqueElements = new Set();
            while (uniqueElements.size < n) {
                const randomIndex = Math.floor(Math.random() * arr.length);
                uniqueElements.add(arr[randomIndex]);
            }

            const elementsToDuplicate = Array.from(uniqueElements);
            return arr.concat(elementsToDuplicate);
        }

        function pseudorandomSort(arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                if (Math.random() > 0.4) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                }
            }
        }

        function repeatDistanceCheck(arr, minDistance = 3) {
            function isRepeated(arr, i, n = arr[i]) {
                let j = i - minDistance;
                if (j < 0) j = 0;
                for (j; j < i; j++) {
                    if (arr[j] === n) {
                        return true;
                    }
                }
                return false;
            }

            for (let i = 1; i < arr.length; i++) {
                if (isRepeated(arr, i)) {
                    let j = i + 1;
                    let remaining = [];
                    let end = false;
                    if (j >= arr.length) {
                        end = true;
                        remaining = arr.splice(i);
                    }
                    while (!end) {
                        if (isRepeated(arr, i, arr[j])) {
                            j++;
                            if (j >= arr.length) {
                                remaining = arr.splice(i);
                                end = true;
                            }
                        }
                        else {
                            [arr[i], arr[j]] = [arr[j], arr[i]];
                            end = true;
                        }
                    }
                    if (remaining.length > 0) {
                        arr.splice(arr.length-2*minDistance, 0, ...remaining);
                        break;
                    }
                }
            }
        }

        let addedRange = 0;
        if (sessionDifficulty === 1) addedRange = 5;
        else if (sessionDifficulty === 2) addedRange = 10;

        let maxNumber = 21;
        if (sessionDifficulty === -1) maxNumber = 15;
        else if (sessionDifficulty === -2) maxNumber = 10;

        let a = Array.from({ length: maxNumber }, (_, i) => i+1+addedRange);
        if (sessionDifficulty >= 0) a = duplicateElements(a, 7);
        a.sort((a, b) => a - b);

        let scrambleFactor = 4;
        if (sessionDifficulty === -1) scrambleFactor = 3;
        else if (sessionDifficulty === -2) scrambleFactor = 2;
        a = sectionScramble(a, scrambleFactor);
        pseudorandomSort(a);
        repeatDistanceCheck(a);
        console.log("Run numbers:", a);
        numbersToDisplay.current = a;
    };

    const handleButtonClick = (n, resTime) => {
        const answer = n === number;
        if (answer) {
            console.log("Correct!");
            correctSound.current.play().then(r => {});
        } else {
            console.log("Incorrect!");
            incorrectSound.current.play().then(r => {});
        }
        trialData(answer, resTime);
        if (trialIter >= 28 || (trialIter >= 10 && sessionDifficulty === -2) || (trialIter >= 15 && sessionDifficulty === -1) || (sessionDifficulty === -3)) { //28, 15 i 10 trials
            setTrialIter(1);
            endRun();
            if ((runNumber >= 1 && sessionDifficulty <= -3) || (runNumber >= 2 && sessionDifficulty <= -2) || runNumber >= 3) endGame(); //2 runs at -2, 3 runs at >= -1
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
        imageId.current = getImageId();
        setGameState('passives');
        updateCanvasPassive();
    };

    const runContinueEnd = () => {
        setGameState('number');
        updateCanvasTrial();
    };

    const endGame = () => {
        setGameState('end');
        endSession();
    }

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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

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

    return (
        <div ref={screenSet} className={document.fullscreenElement === screenSet.current? styles.canvasContainerFull : styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <div>
                {gameState === 'start' && <StartScreen onStartGame={handleStartGame}/>}
                {gameState === 'runIntroFirst' && <RunIntroFirstScreen/>}
                {gameState === 'runContinue' && <RunContinueScreen/>}
                {gameState === 'button' && <ButtonScreen onButtonClick={handleButtonClick} number={number} distance={4-runNumber}/>}
                {gameState === 'trialContinue' && <TrialContinueScreen/>}
                {gameState === 'runIntroSecond' && <RunIntroSecondScreen/>}
                {gameState === 'end' && <EndScreen/>}

            </div>
        </div>
    );

};

export default Game;
