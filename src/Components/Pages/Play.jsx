import React from "react";
import Game from "../Game/Game";
import { GameProvider } from "../../contexts/gameContext/gameContext";

const Play = () => {
    return (
        <>
        <h1>Play</h1>
        <GameProvider>
            <Game />
        </GameProvider>
        </>
    );
};
export default Play;