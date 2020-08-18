import React from "react";
import { Link } from "react-router-dom";

interface Props {
    submitQuiz: any;
}

function SubmitQuizButton(props: Props) {
    const { submitQuiz } = props;

    return (
        //Causes error when quiz is not complete but submitted

        <button
            className="btn btn-lg text-uppercase btn-success mt-3 mb-5"
            onClick={submitQuiz}
        >
            Submit Quiz!
        </button>
    );
}

export default SubmitQuizButton;
