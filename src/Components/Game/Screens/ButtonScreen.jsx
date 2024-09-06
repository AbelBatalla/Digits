import styles from './ButtonScreen.module.css';
import React from "react";

const ButtonScreen = ({ onButtonClick, number }) => { // Accept the function as a prop
    return (
        <>
        <button className={[styles.numberButton, styles.numberButtonLeft].join(' ')} onClick={onButtonClick(number-2)}>{number-2}</button>
        <button className={[styles.numberButton, styles.numberButtonCenter].join(' ')} onClick={onButtonClick(number)}>{number}</button>
        <button className={[styles.numberButton, styles.numberButtonRight].join(' ')} onClick={onButtonClick(number+2)}>{number+2}</button>
        </>
    );
};

export default ButtonScreen;
