import React from "react";
import { QuestionType } from "../../Types/Types";
import Question from "./QuestionCardComponents/Question";
import QuestionAnswerChoices from "./QuestionCardComponents/QuestionAnswerChoices";

interface Props {
    question: QuestionType;
    questionNum: number;
    showAnswers?: boolean;
    correctAnswer?: string | null;
    selectedAnswer?: string | null;
}

function QuestionCard(props: Props) {
    const {
        question,
        questionNum,
        showAnswers,
        correctAnswer,
        selectedAnswer,
    } = props;
    const { category, answer_choices } = question;
    const theQuestion = question["question"];

    function changeActive(e: any): void {
        const parentUlElement = e.target.parentElement;
        const childrenElements = parentUlElement.childNodes;

        //Change all other items to inactive
        for (let i = 0; i < childrenElements.length; i++) {
            const child = childrenElements[i];
            child.classList.remove("list-group-item-info");
        }

        //Change the clicked item to active
        e.target.classList.add("list-group-item-info");
    }

    return (
        <div className="quiz-question mb-5" data-aos="fade-up">
            <Question
                questionNum={questionNum}
                theQuestion={theQuestion}
                category={category}
            />
            <QuestionAnswerChoices
                showAnswers={showAnswers}
                correctAnswer={correctAnswer}
                selectedAnswer={selectedAnswer}
                changeActive={changeActive}
                answer_choices={answer_choices}
            />
        </div>
    );
}

export default QuestionCard;
