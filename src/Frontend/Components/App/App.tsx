import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TOTAL_QUESTIONS } from "../../Config/Config";
import Navbar from "../Navbar/Navbar";
import SettingsPage from "../SettingsPage/SettingsPage";
import QuizPage from "../QuizPage/QuizPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import Leaderboards from "../Leaderboards/Leaderboards";
import { postResults, getQuestions } from "../../FetchingData/FetchingData";
import {
    QuestionType,
    AnswerPairType,
    DifficultyType,
    PostDataType,
} from "../../Types/Types";
import {
    accuracy,
    formatTime,
    averageTimePer,
} from "../../HelperFunctions/HelperFunctions";

//RESTART THE TIMER ON A SUCCESSFUL POST
function App() {
    //STATES
    const [correct, setCorrect] = useState<number>(0);
    const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [isTimerOn, setIsTimerOn] = useState<boolean>(false);
    const [isValidQuizSubmit, setIsValidQuizSubmit] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answerPairs, setAnswerPairs] = useState<AnswerPairType[]>([]);
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

        //Validation / Checks for names for no spaces and length
        if (name.indexOf(" ") === -1 && name.length >= 1) {
            setSecondsElapsed(0);
            setIsTimerOn(true);
            setName(name);
            setDifficulty(difficulty);
            getQuestions(difficulty, category, setQuestions);
        } else {
            alert("Name must have no spaces and be 1 character long");
        }
    }

    //Returns an array of selected and correct answer object pairs
    function gatherAnswers(): AnswerPairType[] {
        const answerPairings: AnswerPairType[] = [];
        const answerChoicesGroups = document.querySelectorAll(".user-answers");

        for (let i = 0; i < answerChoicesGroups.length; i++) {
            const correctAnswer = questions[i].correct_answer;
            const answerChoicesGroup = answerChoicesGroups[i];
            const answerChoices: HTMLInputElement[] = Array.from(
                answerChoicesGroup.querySelectorAll(".list-group-item")
            );

            for (let i = 0; i < answerChoices.length; i++) {
                const choice = answerChoices[i];
                if (choice.classList.contains("list-group-item-info")) {
                    const selectedAnswer = choice.textContent;
                    const answerPair = {
                        correctAnswer: correctAnswer,
                        userAnswer: selectedAnswer,
                    };
                    answerPairings.push(answerPair);
                }
            }
        }

        return answerPairings;
    }

    //Returns the # of correct answers selected
    function countCorrect(answerPairings: AnswerPairType[]): number {
        let correct = 0;
        for (let i = 0; i < answerPairings.length; i++) {
            const pair = answerPairings[i];
            const correctAnswer = pair.correctAnswer;
            const userAnswer = pair.userAnswer;
            if (correctAnswer === userAnswer) {
                correct++;
            }
        }
        return correct;
    }

    //Validates that all questions are answered and POSTs to database
    function submitQuiz() {
        const answerPairings = gatherAnswers();
        const correct = countCorrect(answerPairings);

        //Submit Valid Quiz Submission
        if (answerPairings.length === TOTAL_QUESTIONS) {
            setIsTimerOn(false);
            setCorrect(correct);
            setIsValidQuizSubmit(true);
            setAnswerPairs(answerPairings);
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
                    {isValidQuizSubmit ? (
                        <Redirect to="/quiz/results" />
                    ) : (
                        <QuizPage
                            questions={questions}
                            submitQuiz={submitQuiz}
                        />
                    )}
                </Route>
                <Route path="/" exact>
                    <SettingsPage startGame={startGame} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
