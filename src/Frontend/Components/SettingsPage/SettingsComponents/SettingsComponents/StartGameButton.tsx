import React from "react";
import { Link } from "react-router-dom";

interface Props {
    startGame: any;
}

function StartGameButton(props: Props) {
    const { startGame } = props;

    return (
        <Link to="/quiz">
            <div>
                <button
                    className="btn btn-lg btn-outline-primary w-100 font-weight-bold text-uppercase"
                    onClick={startGame}
                >
                    Start Game
                </button>
            </div>
        </Link>
    );
}

export default StartGameButton;
