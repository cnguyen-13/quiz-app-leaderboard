import React from "react";
import { QuestionType } from "../../Types/Types";
import QuestionCard from "../QuestionCard/QuestionCard";
import SubmitQuiz from "./QuizPageComponents/SubmitQuizButton";

interface Props {
    questions: QuestionType[];
    submitQuiz: any;
}

function QuizPage(props: Props) {
    const { questions, submitQuiz } = props;

    return (
        <div className="container from-navbar-offset-mt">
            {questions.map((question, idx) => {
                return (
                    <QuestionCard question={question} questionNum={idx + 1} />
                );
            })}
            <SubmitQuiz submitQuiz={submitQuiz} />
        </div>
    );
}

export default QuizPage;
