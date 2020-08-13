import React, { useEffect } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType, CorrectAnswerAndUserAnswer } from "../../Types/Types";
import { TOTAL_QUESTIONS } from "../../Config/Config";
import { formatTime } from "../../HelperFunctions/formatTime";
import { averageTimePer } from "../../HelperFunctions/averageTimePer";
import { accuracy } from "../../HelperFunctions/accuracy";

interface Props {
    playerName: string;
    timeElapsed: number;
    correct: number;
    questions: QuestionType[];
    correctAndSelectedPairs: CorrectAnswerAndUserAnswer[];
}

function ResultsPage(props: Props) {
    //Questions and CorrectAndSelectedPairs match up idx wise
    const {
        playerName,
        timeElapsed,
        correct,
        questions,
        correctAndSelectedPairs,
    } = props;

    return (
        <div className="results">
            <h2>Results</h2>
            <p>Player Name: {playerName}</p>
            <p>
                Correct: {correct} / {TOTAL_QUESTIONS}
            </p>
            <p>Accuracy: {accuracy(correct)}</p>
            <p>Time Elapsed: {formatTime(timeElapsed)}</p>
            <p>Average Time Per Questions: {averageTimePer(timeElapsed)}s</p>

            <section className="mt-5">
                <h2>Questions Review</h2>
                {questions.map((question, idx) => {
                    const pair = correctAndSelectedPairs[idx];
                    return (
                        <QuestionCard
                            question={question}
                            questionNum={idx + 1}
                            showAnswers={true}
                            selectedAnswer={pair.userAnswer}
                            correctAnswer={pair.correctAnswer}
                        />
                    );
                })}
            </section>
        </div>
    );
}

export default ResultsPage;
