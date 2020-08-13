import React from "react";
import { Link } from "react-router-dom";

interface Props {
    message: string;
    timer: string;
}

function Navbar(props: Props) {
    const { message, timer } = props;

    return (
        <nav className="container-fluid w-100 navbar navbar-dark bg-dark p-3">
            <div className="container">
                <h1 className="text-white">{message}</h1>
                <form className="form-inline">
                    <Link to="/leaderboards">
                        <button
                            onClick={() => {}}
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
{
    /* 
<nav className="container-fluid mb-5 p-3 bg-dark text-white fixed-top">
            <div className="container d-flex justify-content-between align-items-center">
                <h1>{message}</h1>
                <p>{timer}</p>
            </div>

        </nav> */
}
