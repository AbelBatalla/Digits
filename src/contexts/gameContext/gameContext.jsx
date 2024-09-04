import React, { useContext, useState, useEffect } from "react";

const GameContext = React.createContext();
export function useGame() {
    return useContext(GameContext);
}

export function GameProvider({ children }) {
    const [sessionDifficulty, setSessionDifficulty] = useState(0);
    const [runNumber, setRunNumber] = useState(0);
    const [usedImages, setUsedImages] = useState([]);
    const [availableImages, setAvailableImages] = useState(Array.from({ length: 21 }, (_, i) => i));


    function changeSessionDifficulty(difficulty) {
        setSessionDifficulty(difficulty);
        console.log("difficulty: ", difficulty);
    }

    function incrementRunNumber() {
        setRunNumber(runNumber + 1);
    }

    function endSession() {
        setRunNumber(0);
        setSessionDifficulty(0);
        setAvailableImages(Array.from({ length: 21 }, (_, i) => i));
    }

    function getImageId() {
        if (availableImages.length === 0) {
            throw new Error('No available image IDs left in the specified range.');
        }
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const imageId = availableImages[randomIndex];
        availableImages.splice(randomIndex, 1);
        return imageId;
    }

    const value = {
        sessionDifficulty,
        changeSessionDifficulty,
        endSession,
        runNumber,
        incrementRunNumber,
        getImageId
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}