import styles from './ButtonScreen.module.css';
import React, {useEffect, useRef} from "react";

const ButtonScreen = ({ onButtonClick, number }) => {
    const startTime = useRef(null);

    useEffect(() => {
        startTime.current = Date.now();
    }, []);

    const handleClick = (selectedNumber) => {
        const resTime = Date.now() - startTime.current;
        onButtonClick(selectedNumber, resTime);
    };

    return (
        <>
        <button className={[styles.numberButton, styles.numberButtonLeft].join(' ')} onClick={() => handleClick(number-2)}>{number-2}</button>
        <button className={[styles.numberButton, styles.numberButtonCenter].join(' ')} onClick={() => handleClick(number)}>{number}</button>
        <button className={[styles.numberButton, styles.numberButtonRight].join(' ')} onClick={() => handleClick(number+2)}>{number+2}</button>
        </>
    );
};

export default ButtonScreen;
