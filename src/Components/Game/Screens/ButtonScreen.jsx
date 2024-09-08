import styles from './ButtonScreen.module.css';
import React, {useEffect, useRef} from "react";

const ButtonScreen = ({ onButtonClick, number, distance }) => {
    const startTime = useRef(null);
    const answersRef = useRef(generateRandomArray());

    function generateRandomArray() {
        const cases = [
            [number - 2 * distance, number - distance, number],
            [number - distance, number, number + distance],
            [number, number + distance, number + 2 * distance]
        ];
        const validCases = cases.filter(arr => arr.every(num => num >= 0));
        const randomIndex = Math.floor(Math.random() * validCases.length);
        return validCases[randomIndex].sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        startTime.current = Date.now();
    }, []);

    const handleClick = (selectedNumber) => {
        const resTime = Date.now() - startTime.current;
        onButtonClick(selectedNumber, resTime);
    };

    return (
        <>
        <button className={[styles.numberButton, styles.numberButtonLeft].join(' ')} onClick={() => handleClick(answersRef.current[0])}>{answersRef.current[0]}</button>
        <button className={[styles.numberButton, styles.numberButtonCenter].join(' ')} onClick={() => handleClick(answersRef.current[1])}>{answersRef.current[1]}</button>
        <button className={[styles.numberButton, styles.numberButtonRight].join(' ')} onClick={() => handleClick(answersRef.current[2])}>{answersRef.current[2]}</button>
        </>
    );
};

export default ButtonScreen;
