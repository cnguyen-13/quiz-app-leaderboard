import React, { useState, useEffect } from "react";
import SettingsPage from "./Components/SettingsPage/SettingsPage";
import QuizPage from "./Components/QuizPage/QuizPage";
import { TOTAL_QUESTIONS } from "./Config/Config";
import { getQuestions } from "./FetchingData/getQuestions";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ResultsPage from "./Components/ResultsPage/ResultsPage";
import Leaderboards from "./Components/Leaderboards/Leaderboards";
import { formatTime } from "./HelperFunctions/formatTime";
import { accuracy } from "../Frontend/HelperFunctions/accuracy";
import { averageTimePer } from "../Frontend/HelperFunctions/averageTimePer";
import { postResults } from "../Frontend/FetchingData/postResults";
import {
    QuestionType,
    CorrectAnswerAndUserAnswer,
    DifficultyType,
    PostData,
} from "./Types/Types";

function App() {
    //Need Difficulty, stringed percentage, time per quesiton
    const [correct, setCorrect] = useState<number>(0);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [player, setPlayer] = useState<string>("");
    const [difficulty, setDifficulty] = useState<DifficultyType>(
        DifficultyType["ALL"]
    );

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
        setDifficulty(playerDifficulty);
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
            setIsTimerOn(false);
            setSecondsElapsed(0);
            setCorrect(correct);
            setCorrectAndSelectedPairs(selectedAnswers);
            const data: PostData = {
                difficulty: difficulty,
                name: player,
                num_correct: correct,
                percentage: accuracy(correct),
                time_seconds: secondsElapsed,
                time_per_question_seconds: averageTimePer(secondsElapsed),
            };
            postResults(data);
        } else {
            alert("ANSWER ALL QUESTIONS!");
        }
    }

    return (
        <div className="app container-fluid">
            <Navbar
                didTimerStart={isTimerOn}
                setIsTimerOn={setIsTimerOn}
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
                <Route path="/leaderboards">
                    <Leaderboards />
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
