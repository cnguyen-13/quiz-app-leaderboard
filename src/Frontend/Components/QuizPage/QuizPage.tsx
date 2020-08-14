import React, { useState, useEffect } from "react";
import { QuestionType, CorrectAnswerAndUserAnswer } from "../../Types/Types";
import QuestionCard from "../QuestionCard/QuestionCard";
import ResultsPage from "../ResultsPage/ResultsPage";
import SubmitQuiz from "./SubmitQuiz";
import { formatTime } from "../../HelperFunctions/formatTime";
import { TOTAL_QUESTIONS } from "../../Config/Config";
import { DifficultyType } from "../../Types/Types";
import Navbar from "./Navbar";

interface Props {
    questions: QuestionType[];
    playerName: string;
}

function QuizPage(props: Props) {
    const { questions, playerName } = props;
    const [correct, setCorrect] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<DifficultyType>(
        DifficultyType["EASY"]
    );
    const [didGameEnd, setDidGameEnd] = useState<boolean>(false);
    const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
    const [correctAndSelectedPairs, setCorrectAndSelectedPairs] = useState<
        CorrectAnswerAndUserAnswer[]
    >([]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setSecondsElapsed(secondsElapsed + 1);
        }, 1000);

        if (didGameEnd) {
            clearInterval(timeInterval);
        }
        return () => {
            clearInterval(timeInterval);
        };
    }, [secondsElapsed]);

    function submitQuiz() {
        let correct = 0;
        const selectedAnswers: CorrectAnswerAndUserAnswer[] = [];
        const playerAnswers = document.querySelectorAll(".user-answers");

        for (let i = 0; i < playerAnswers.length; i++) {
            const correctAnswer = questions[i].correct_answer;
            const possibleAnswers = playerAnswers[i];
            const choices: HTMLInputElement[] = Array.from(
                possibleAnswers.querySelectorAll(".list-group-item")
            );
            let selectedAnswer = null;
            for (let i = 0; i < choices.length; i++) {
                const choice = choices[i];
                if (choice.classList.contains("list-group-item-info")) {
                    selectedAnswer = choice.textContent;
                    const correctSelectedPair = {
                        correctAnswer: correctAnswer,
                        userAnswer: selectedAnswer,
                    };
                    selectedAnswers.push(correctSelectedPair);
                }
            }
            if (correctAnswer === selectedAnswer) {
                correct++;
            }
        }

        //GOOD
        if (selectedAnswers.length === TOTAL_QUESTIONS) {
            setCorrect(correct);
            setCorrectAndSelectedPairs(selectedAnswers);
            setDidGameEnd(true);
        } else {
            alert("ANSWER ALL QUESTIONS!");
        }
    }

    return (
        <>
            <Navbar
                message={
                    !didGameEnd ? `Quiz App | Quiz` : "Quiz App | End Results"
                }
                timer={!didGameEnd ? formatTime(secondsElapsed) : ""}
            />
            <div className="container quiz">
                {!didGameEnd ? (
                    <>
                        {questions.map((question, idx) => {
                            return (
                                <QuestionCard
                                    question={question}
                                    questionNum={idx + 1}
                                />
                            );
                        })}
                        <SubmitQuiz submitQuiz={submitQuiz} />
                    </>
                ) : (
                    <ResultsPage
                        playerName={playerName}
                        timeElapsed={secondsElapsed}
                        correct={correct}
                        questions={questions}
                        correctAndSelectedPairs={correctAndSelectedPairs}
                    />
                )}
            </div>
        </>
    );
}

export default QuizPage;
