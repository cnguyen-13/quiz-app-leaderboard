import React from "react";
import humaaans from "../../../Images/humaaans.png";

function Description() {
    return (
        <div className="row" data-aos="fade-right">
            <div className="col-12 col-lg-6">
                <div className="mb-5 text-center text-xl-left p-3">
                    <h1 className="mb-4">
                        Test Your Knowledge Against Others!
                    </h1>
                    <p className="lead">
                        Prove yourself in 3 different difficulty levels and a
                        wide range of categories. Start a quiz of 10 questions
                        by entering your name, selecting your difficulty, and a
                        specific category if desired! Submitting your quiz
                        answers will place you on the leaderboards!
                    </p>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <img
                    className="img-fluid"
                    src={humaaans}
                    alt="humaaaans picture"
                />
            </div>
        </div>
    );
}

export default Description;
