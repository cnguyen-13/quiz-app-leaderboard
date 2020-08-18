import React from "react";
import { Link } from "react-router-dom";

interface Props {
    submitQuiz: any;
}

function SubmitQuiz(props: Props) {
    const { submitQuiz } = props;

    return (
        <Link to="/quiz/results">
            <button
                className="btn btn-lg text-uppercase btn-success mt-3 mb-5"
                onClick={submitQuiz}
            >
                Submit Quiz!
            </button>
        </Link>
    );
}

export default SubmitQuiz;
