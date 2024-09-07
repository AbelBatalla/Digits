import React, { useContext, useState } from "react";

const GameContext = React.createContext();
export function useGame() {
    return useContext(GameContext);
}

export function GameProvider({ children }) {
    const [sessionDifficulty, setSessionDifficulty] = useState(0);
    const [runNumber, setRunNumber] = useState(1);
    const [usedImages, setUsedImages] = useState([]);
    const [availableImages, setAvailableImages] = useState(Array.from({ length: 21 }, (_, i) => i));
    const [runData, setRunData] = useState([]);
    const [currentRun, setCurrentRun] = useState({avgResponseTime: 0, correctRate: 0});

    function changeSessionDifficulty(difficulty) {
        setSessionDifficulty(difficulty);
        console.log("difficulty: ", difficulty);
    }

    function trialData(answer, time) {
        setCurrentRun({avgResponseTime: currentRun.avgResponseTime + time, correctRate: answer ? currentRun.correctRate + 1 : currentRun.correctRate});
    }

    function incrementRunNumber() {
        setRunNumber(runNumber + 1);
    }

    function endRun() {
        setCurrentRun({avgResponseTime: currentRun.avgResponseTime / 5, correctRate: currentRun.correctRate * 100 / 5});
        console.log("currentRun: ", currentRun);
        setRunData([...runData, currentRun]);
        setCurrentRun({avgResponseTime: 0, correctRate: 0});
    }

    function resetSession() {
        setRunNumber(1);
        setSessionDifficulty(0);
        setAvailableImages(Array.from({ length: 21 }, (_, i) => i));
    }

    function endSession() {
        const now = new Date();
// Get time in UTC+2 (you can use "Europe/Berlin" or other relevant timezone identifiers)
        const options = {
            timeZone: 'Europe/Berlin', // Timezone with UTC+2 during daylight savings
            hour12: false,             // Use 24-hour format
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const formattedTimeUTC2 = now.toLocaleString('en-GB', options);

        const SessionData = {
            user: "user",
            date: formattedTimeUTC2,
            difficulty: sessionDifficulty,
            sessionCorrectRate: runData.reduce((acc, run) => acc + run.correctRate, 0) / runData.length,
            sessionAvgResponseTime: runData.reduce((acc, run) => acc + run.avgResponseTime, 0) / runData.length,
            runs: runData
        };
        console.log(SessionData);
        resetSession();
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
        getImageId,
        trialData,
        endRun,
        resetSession
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}