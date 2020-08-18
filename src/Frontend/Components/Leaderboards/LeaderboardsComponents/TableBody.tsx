import React from "react";

interface Props {
    results: any[];
}

function TableBody(props: Props) {
    const { results } = props;

    return (
        <tbody>
            {results.map((record, idx) => {
                return (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{record.name}</td>
                        <td>{record.num_correct}</td>
                        <td>{record.percentage}</td>
                        <td>{record.time_seconds}</td>
                        <td>{record.time_per_question_seconds}</td>
                    </tr>
                );
            })}
        </tbody>
    );
}

export default TableBody;
