import React from "react";
import Navbar from "../QuizPage/Navbar";
import Description from "./Description";
import Settings from "./Settings";

interface Props {
    startGame: any;
}

function SettingsPage(props: Props) {
    const { startGame } = props;

    return (
        <div className="container-fluid settings-page">
            <Navbar message={"Quiz App"} timer={""} />
            <div className="container margin-top pt-5">
                <Description />
                <Settings startGame={startGame} />
            </div>
        </div>
    );
}

export default SettingsPage;
