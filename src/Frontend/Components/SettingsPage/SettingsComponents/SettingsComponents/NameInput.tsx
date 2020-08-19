import React from "react";

function NameInput() {
    return (
        <div className="form-group">
            <label className="d-block font-weight-bold" htmlFor="player-name">
                Name: <span className="text-danger">*</span>
            </label>
            <input
                className="d-block form-control"
                type="text"
                id="name"
                placeholder="Your name"
            />
        </div>
    );
}

export default NameInput;
