import React from "react";
import humaaans from "../../../Images/humaaans 2.png";
import NameInput from "./SettingsComponents/NameInput";
import DifficultyInput from "./SettingsComponents/DifficultyInput";
import CategoryInput from "./SettingsComponents/CategoryInput";
import StartGameButton from "./SettingsComponents/StartGameButton";
interface Props {
    startGame: any;
}

function Settings(props: Props) {
    const { startGame } = props;

    return (
        <div className="row mt-5 p-3" data-aos="fade-left">
            <div className="col-12 col-lg-6 order-2 order-lg-1">
                <img
                    className="img-fluid mb-5"
                    src={humaaans}
                    alt="humaaaans"
                />
            </div>
            <div className="col-12 col-lg-6  order-lg-2 mb-5">
                <h2 className="text-center text-xl-left mb-4">Quiz Settings</h2>
                <NameInput />
                <DifficultyInput />
                <CategoryInput />
                <StartGameButton startGame={startGame} />
            </div>
        </div>
    );
}

export default Settings;
