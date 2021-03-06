import React from "react";
import Description from "./SettingsComponents/Description";
import Settings from "./SettingsComponents/Settings";

interface Props {
    startGame: any;
}

function SettingsPage(props: Props) {
    const { startGame } = props;

    return (
        <div className="container from-navbar-offset-mt">
            <Description />
            <Settings startGame={startGame} />
        </div>
    );
}

export default SettingsPage;
