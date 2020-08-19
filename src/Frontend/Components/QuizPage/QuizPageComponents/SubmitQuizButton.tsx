import React from "react";

interface Props {
    submitQuiz: any;
}

function SubmitQuizButton(props: Props) {
    const { submitQuiz } = props;

    return (
        <button
            className="btn btn-lg text-uppercase btn-success mt-3 mb-5"
            onClick={submitQuiz}
        >
            Submit Quiz!
        </button>
    );
}

export default SubmitQuizButton;
