import React, {useContext, useRef, useState} from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../authContext/authContext";
import { collection, addDoc } from "firebase/firestore";

const GameContext = React.createContext();
export function useGame() {
    return useContext(GameContext);
}

export function GameProvider({ children }) {
    const { userLoggedIn, currentUser } = useAuth();
    const [sessionDifficulty, setSessionDifficulty] = useState(0);
    const [runNumber, setRunNumber] = useState(1);
    const [availableImages, setAvailableImages] = useState(Array.from({ length: 5 }, (_, i) => i)); //[MODIFY IMAGES]
    const runDataRef = useRef([]);
    const currentRunRef = useRef({avgResponseTime: 0, correctRate: 0});

    function changeSessionDifficulty(difficulty) {
        setSessionDifficulty(Number(difficulty));
    }

    function trialData(answer, time) {
        currentRunRef.current = {avgResponseTime: currentRunRef.current.avgResponseTime + time, correctRate: answer ? currentRunRef.current.correctRate + 1 : currentRunRef.current.correctRate};
    }

    function incrementRunNumber() {
        setRunNumber(runNumber + 1);
    }

    function endRun() {
        let numResponses = 28;
        if (sessionDifficulty === -1) numResponses = 15;
        else if (sessionDifficulty === -2) numResponses = 10;
        currentRunRef.current = {avgResponseTime: currentRunRef.current.avgResponseTime / numResponses, correctRate: currentRunRef.current.correctRate * 100 / numResponses};
        console.log("currentRun: ", currentRunRef.current);
        runDataRef.current = [...runDataRef.current, currentRunRef.current];
        currentRunRef.current = {avgResponseTime: 0, correctRate: 0};
    }

    function resetSession() {
        setRunNumber(1);
        setSessionDifficulty(0);
        setAvailableImages(Array.from({ length: 5 }, (_, i) => i)); //[MODIFY IMAGES]
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
            UserID: userLoggedIn ? currentUser.uid : "none",
            Profile: "default",
            Date: formattedTimeUTC2,
            Difficulty: sessionDifficulty,
            SessionCorrectRate: runDataRef.current.reduce((acc, run) => acc + run.correctRate, 0) / runDataRef.current.length,
            SessionAvgResponseTime: runDataRef.current.reduce((acc, run) => acc + run.avgResponseTime, 0) / runDataRef.current.length,
            runs: runDataRef.current
        };
        console.log(SessionData);
        storeSessionData(SessionData);
        resetSession();
    }

    const storeSessionData = async (data) => {
        try {
            const docRef = await addDoc(collection(db, "Sessions"), data);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
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