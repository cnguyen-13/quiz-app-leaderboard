import React, { useState, useEffect } from "react";
import SettingsPage from "./Components/SettingsPage/SettingsPage";
import QuizPage from "./Components/QuizPage/QuizPage";
import { TOTAL_QUESTIONS } from "./Config/Config";
import { getQuestions } from "./FetchingData/getQuestions";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ResultsPage from "./Components/ResultsPage/ResultsPage";
import { formatTime } from "./HelperFunctions/formatTime";
import {
    QuestionType,
    CorrectAnswerAndUserAnswer,
    DifficultyType,
} from "./Types/Types";

function App() {
    const [correct, setCorrect] = useState<number>(0);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [player, setPlayer] = useState<string>("");
    //Time
    const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
    const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
    const [correctAndSelectedPairs, setCorrectAndSelectedPairs] = useState<
        CorrectAnswerAndUserAnswer[]
    >([]);

    useEffect(() => {
        let timeInterval: any = isTimerOn
            ? setInterval(() => {
                  setSecondsElapsed(secondsElapsed + 1);
              }, 1000)
            : null;

        return () => {
            clearInterval(timeInterval);
        };
    }, [isTimerOn, secondsElapsed]);

    function startGame() {
        //Inputs Elements
        setIsTimerOn(true);
        const playerNameInput: any = document.querySelector("#player-name");
        const playerDifficultyInput: any = document.querySelector(
            "#player-difficulty"
        );
        const playerCategoryInput: any = document.querySelector(
            "#player-category"
        );

        //Values at Inputs
        const playerName: string = playerNameInput.value;
        const playerDifficulty: DifficultyType = playerDifficultyInput.value;
        const playerCategory: string = playerCategoryInput.value;

        //Checks for names for no spaces and length
        if (playerName.indexOf(" ") === -1 && playerName.length >= 1) {
            setPlayer(playerName);
            getQuestions(playerDifficulty, playerCategory, setQuestions);
        } else {
            alert("Name must have no spaces and be 1 character long");
        }
    }

    function submitQuiz() {
        setIsTimerOn(false);
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
        } else {
            alert("ANSWER ALL QUESTIONS!");
        }
    }

    return (
        <div className="app container-fluid">
            <Navbar
                didTimerStart={isTimerOn}
                timer={isTimerOn ? formatTime(secondsElapsed) : null}
            />
            <Switch>
                <Route path="/quiz/results" exact>
                    <ResultsPage
                        questions={questions}
                        playerName={player}
                        timeElapsed={secondsElapsed}
                        correct={correct}
                        correctAndSelectedPairs={correctAndSelectedPairs}
                    />
                </Route>
                <Route path="/quiz" exact>
                    <QuizPage questions={questions} submitQuiz={submitQuiz} />
                </Route>
                <Route path="/" exact>
                    <SettingsPage startGame={startGame} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
