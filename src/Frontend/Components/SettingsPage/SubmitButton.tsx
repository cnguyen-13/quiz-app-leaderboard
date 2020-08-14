import React from "react";

interface Props {
    startGame: any;
}

function SubmitButton(props: Props) {
    const { startGame } = props;

    return (
        <div>
            <button
                className="btn btn-lg btn-outline-primary w-100 font-weight-bold text-uppercase"
                onClick={startGame}
            >
                Start Game
            </button>
        </div>
    );
}

export default SubmitButton;
