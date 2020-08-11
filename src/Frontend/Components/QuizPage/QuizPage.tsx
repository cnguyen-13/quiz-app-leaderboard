import React, { useState, useEffect } from 'react'
import { QuestionType, CorrectAnswerAndUserAnswer } from '../../Types/Types';
import QuestionCard from '../QuestionCard/QuestionCard';
import ResultsPage from '../ResultsPage/ResultsPage';
import { formatTime } from '../../HelperFunctions/formatTime';
import { decodeHTMLEntities } from '../../HelperFunctions/decodeHTMLEntities';
import { TOTAL_QUESTIONS } from '../../Config/Config';
import Navbar from './Navbar';

interface Props {
    questions: QuestionType[],
    playerName: string,
}

function QuizPage(props: Props) {
    const { questions, playerName } = props;
    const [correct, setCorrect] = useState<number>(0);
    const [correctAndSelectedPairs, setCorrectAndSelectedPairs] = useState<CorrectAnswerAndUserAnswer[]>([])
    const [didGameEnd, setDidGameEnd] = useState<boolean>(false);
    const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setSecondsElapsed(secondsElapsed + 1)
        }, 1000)

        if (didGameEnd) {
            clearInterval(timeInterval);
        }
        return () => {
            clearInterval(timeInterval);
        }
    }, [secondsElapsed])


    function submitQuiz() {
        let correct = 0;
        const selectedAnswers: CorrectAnswerAndUserAnswer[] = [];
        const playerAnswers = document.querySelectorAll('.user-answers');

        for (let i = 0; i < playerAnswers.length; i++) {
            const correctAnswer = questions[i].correct_answer;
            const possibleAnswers = playerAnswers[i];
            const choices: HTMLInputElement[] = Array.from(possibleAnswers.querySelectorAll('.list-group-item'));
            let selectedAnswer = null;
            for (let i = 0; i < choices.length; i++) {
                const choice = choices[i];
                if (choice.classList.contains('active')) {
                    selectedAnswer = choice.textContent;
                    const correctSelectedPair = {
                        correctAnswer: correctAnswer,
                        userAnswer: selectedAnswer
                    }
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
            alert('ANSWER ALL QUESTIONS!')
        }

    }

    return (
        <>
            <Navbar message={!didGameEnd ? `Good Luck ${playerName}!` : 'End Results'} timer={!didGameEnd ? formatTime(secondsElapsed) : ''} />
            <div className="quiz">
                <h2 className="text-center mt-3 mb-3">{!didGameEnd ? 'Quiz Page!' : 'Results Page!'}</h2>
                {!didGameEnd ?
                    <>
                        {questions.map((question, idx) => {
                            return <QuestionCard question={question} questionNum={idx + 1} />
                        })}
                        <button className="btn btn-lg  text-uppercase btn-success mt-3 mb-5" onClick={submitQuiz}>Submit Quiz!</button>
                    </> : <ResultsPage playerName={playerName} timeElapsed={secondsElapsed} correct={correct} questions={questions} correctAndSelectedPairs={correctAndSelectedPairs} />
                }
            </div>
        </>
    )

}

export default QuizPage
