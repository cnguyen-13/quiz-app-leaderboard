import React from "react";
import QuestionCard from "../../QuestionCard/QuestionCard";
import { QuestionType, AnswerPairType } from "../../../Types/Types";

interface Props {
    questions: QuestionType[];
    answerPairs: AnswerPairType[];
}

function QuestionReview(props: Props) {
    const { questions, answerPairs } = props;

    return (
        <section className="mt-5">
            <h2>Questions Review</h2>
            {questions.map((question, idx) => {
                const pair = answerPairs[idx];
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
    );
}

export default QuestionReview;
