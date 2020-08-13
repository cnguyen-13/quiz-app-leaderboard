import React from "react";
import { categories } from "../../HelperFunctions/categories";

function CategoryInput() {
    return (
        <div className="form-group mb-5">
            <label
                className="d-block font-weight-bold"
                htmlFor="player-category"
            >
                Category: <span className="text-danger">*</span>
            </label>
            <select className="d-block form-control" id="player-category">
                {categories.map((category) => {
                    return <option value={category[1]}>{category[0]}</option>;
                })}
            </select>
        </div>
    );
}

export default CategoryInput;