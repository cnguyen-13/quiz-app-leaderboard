import React, { useEffect } from "react";
import Results from "./ResultsPageComponents/Results";
import QuestionReview from "./ResultsPageComponents/QuestionReview";
import { QuestionType, AnswerPairType } from "../../Types/Types";

interface Props {
    name: string;
    timeElapsed: number;
    correct: number;
    questions: QuestionType[];
    answerPairs: AnswerPairType[];
}

function ResultsPage(props: Props) {
    useEffect(() => {}, []);
    const { name, timeElapsed, correct, questions, answerPairs } = props;

    return (
        <div className="container from-navbar-offset-mt">
            <Results name={name} timeElapsed={timeElapsed} correct={correct} />
            <QuestionReview questions={questions} answerPairs={answerPairs} />
        </div>
    );
}

export default ResultsPage;
