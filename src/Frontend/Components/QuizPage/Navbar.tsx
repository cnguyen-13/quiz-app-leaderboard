import React from 'react'

interface Props {
    message: string;
    timer: string;
}

function Navbar(props: Props) {
    const { message, timer } = props

    return (
        <nav className="container-fluid mb-5 p-3 bg-dark text-white fixed-top">
            <div className="container d-flex justify-content-between align-items-center">
                <h1>{message}</h1>
                <p>{timer}</p>
            </div>

        </nav>
    )
}

export default Navbar
