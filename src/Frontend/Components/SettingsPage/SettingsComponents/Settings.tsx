import React from "react";
import humaaans from "../../../Images/humaaans 2.png";
import NameInput from "./NameInput";
import DifficultyInput from "./DifficultyInput";
import CategoryInput from "./CategoryInput";
import SubmitButton from "./SubmitButton";
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
                    alt="humaaaans picture"
                />
            </div>
            <div className="col-12 col-lg-6  order-lg-2 mb-5">
                <h2 className="text-center text-xl-left mb-4">Quiz Settings</h2>
                <NameInput />
                <DifficultyInput />
                <CategoryInput />
                <SubmitButton startGame={startGame} />
            </div>
        </div>
    );
}

export default Settings;
