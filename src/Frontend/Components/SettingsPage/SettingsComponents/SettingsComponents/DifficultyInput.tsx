import React from "react";
import { DifficultyType } from "../../../../Types/Types";

function DifficultyInput() {
    return (
        <div className="form-group">
            <label
                className="d-block font-weight-bold"
                htmlFor="player-difficulty"
            >
                Difficulty: <span className="text-danger">*</span>
            </label>
            <select className="d-block form-control" id="difficulty">
                <option value={DifficultyType["EASY"]}>Easy</option>
                <option value={DifficultyType["MEDIUM"]}>Medium</option>
                <option value={DifficultyType["HARD"]}>Hard</option>
            </select>
        </div>
    );
}

export default DifficultyInput;
