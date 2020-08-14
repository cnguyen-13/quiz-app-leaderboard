import React from "react";
import { Link } from "react-router-dom";

interface Props {
    timer?: string | null;
    didTimerStart: boolean;
}

function Navbar(props: Props) {
    const { timer, didTimerStart } = props;

    function promptUser() {
        if (didTimerStart) {
            prompt(
                "Are you sure to want to check leaderboards, your quiz will stop!"
            );
        }
    }

    return (
        <nav className="container-fluid w-100 navbar navbar-dark bg-dark p-3">
            <div className="container">
                <h1 className="text-white">Quiz App</h1>
                {timer ? <h2 className="text-white">{timer}</h2> : null}
                <form className="form-inline">
                    <Link to="/leaderboards">
                        <button
                            onClick={promptUser}
                            className="btn btn-primary text-uppercase"
                            type="submit"
                        >
                            Search Leaderboards
                        </button>
                    </Link>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
