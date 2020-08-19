import React from "react";
import TableHeaders from "./TableHeaders";
import TableBody from "./TableBody";

interface Props {
    results: any[];
}

function Table(props: Props) {
    const { results } = props;

    return (
        <table className="table">
            <TableHeaders
                columns={[
                    "Rank #",
                    "Name",
                    "# Correct",
                    "% Correct",
                    "Time(sec)",
                    "Avg Time(sec)",
                ]}
            />
            <TableBody results={results} />
        </table>
    );
}

export default Table;
