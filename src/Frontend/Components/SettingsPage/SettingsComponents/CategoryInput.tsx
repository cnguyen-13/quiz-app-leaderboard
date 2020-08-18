import React from "react";
import { categories } from "../../../Data/categories";

function CategoryInput() {
    return (
        <div className="form-group mb-5">
            <label
                className="d-block font-weight-bold"
                htmlFor="player-category"
            >
                Category: <span className="text-danger">*</span>
            </label>
            <select className="d-block form-control" id="category">
                {categories.map((category) => {
                    return (
                        <option key={category[0]} value={category[1]}>
                            {category[0]}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default CategoryInput;
