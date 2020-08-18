import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { TOTAL_QUESTIONS } from "../../Config/Config";
import Navbar from "../Navbar/Navbar";
import SettingsPage from "../SettingsPage/SettingsPage";
import QuizPage from "../QuizPage/QuizPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import Leaderboards from "../Leaderboards/Leaderboards";
import { postResults, getQuestions } from "../../FetchingData/FetchingData";
import {
    QuestionType,
    AnswerPair,
    DifficultyType,
    PostDataType,
} from "../../Types/Types";
import {
    accuracy,
    formatTime,
    averageTimePer,
} from "../../HelperFunctions/HelperFunctions";

function App() {
    //STATES
    const [correct, setCorrect] = useState<number>(0);
    const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answerPairs, setAnswerPairs] = useState<AnswerPair[]>([]);
    const [difficulty, setDifficulty] = useState<DifficultyType>(
        DifficultyType["ALL"]
    );

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
        //Input Elements
        const nameInput: any = document.querySelector("#name");
        const difficultyInput: any = document.querySelector("#difficulty");
        const categoryInput: any = document.querySelector("#category");

        //Values at Inputs
        const name: string = nameInput.value;
        const difficulty: DifficultyType = difficultyInput.value;
        const category: string = categoryInput.value;

        //Checks for names for no spaces and length
        if (name.indexOf(" ") === -1 && name.length >= 1) {
            setIsTimerOn(true);
            setName(name);
            setDifficulty(difficulty);
            getQuestions(difficulty, category, setQuestions);
        } else {
            alert("Name must have no spaces and be 1 character long");
        }
    }

    function submitQuiz() {
        setIsTimerOn(false);
        setSecondsElapsed(0);
        let correct = 0;
        const selectedAnswers: AnswerPair[] = [];
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
            setAnswerPairs(selectedAnswers);
            const data: PostDataType = {
                difficulty: difficulty,
                name: name,
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
                timer={isTimerOn ? formatTime(secondsElapsed) : null}
            />
            <Switch>
                <Route path="/quiz/results" exact>
                    <ResultsPage
                        questions={questions}
                        name={name}
                        timeElapsed={secondsElapsed}
                        correct={correct}
                        answerPairs={answerPairs}
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
