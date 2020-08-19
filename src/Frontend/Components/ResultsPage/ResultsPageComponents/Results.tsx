import React from "react";
import { TOTAL_QUESTIONS } from "../../../Config/Config";
import {
    accuracy,
    formatTime,
    averageTimePer,
} from "../../../HelperFunctions/HelperFunctions";

interface Props {
    name: string;
    timeElapsed: number;
    correct: number;
}

function Results(props: Props) {
    const { name, timeElapsed, correct } = props;

    return (
        <section>
            <h2>Results</h2>
            <p>Player Name: {name}</p>
            <p>
                Correct: {correct} / {TOTAL_QUESTIONS}
            </p>
            <p>Accuracy: {accuracy(correct)}</p>
            <p>Time Elapsed: {formatTime(timeElapsed)}</p>
            <p>Average Time Per Questions: {averageTimePer(timeElapsed)}s</p>
        </section>
    );
}

export default Results;
