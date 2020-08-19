import React from "react";
import { DifficultyType } from "../../../Types/Types";

interface Props {
    setDifficulty: React.Dispatch<React.SetStateAction<DifficultyType>>;
}

function DifficultyInput(props: Props) {
    const { setDifficulty } = props;

    const changeDifficulty = (e: any): void => {
        setDifficulty(e.target.value);
    };

    return (
        <div className="form-group">
            <label
                className="d-block font-weight-bold"
                htmlFor="player-difficulty"
            >
                Leaderboard Difficulty:
            </label>
            <select
                className="d-block form-control"
                id="player-difficulty"
                onChange={changeDifficulty}
            >
                <option value={DifficultyType["ALL"]}>All</option>
                <option value={DifficultyType["EASY"]}>Easy</option>
                <option value={DifficultyType["MEDIUM"]}>Medium</option>
                <option value={DifficultyType["HARD"]}>Hard</option>
            </select>
        </div>
    );
}

export default DifficultyInput;
