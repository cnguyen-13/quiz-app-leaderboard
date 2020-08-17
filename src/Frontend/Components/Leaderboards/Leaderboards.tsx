import React, { useState, useEffect } from "react";
import { DifficultyType } from "../../Types/Types";
import { getFromLeaderboards } from "../../FetchingData/getFromLeaderboards";
import DifficultyInput2 from "./DifficultyInput2";
interface Props {}

function Leaderboards(props: Props) {
    const {} = props;
    const [results, setResults] = useState<any[]>([]);
    const [difficulty, setDifficulty] = useState<DifficultyType>(
        DifficultyType["ALL"]
    );

    useEffect(() => {
        getFromLeaderboards(difficulty, setResults);
    }, [difficulty]);

    return (
        <div className="leaderboards container">
            <DifficultyInput2 setDifficulty={setDifficulty} />
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Rank #</th>
                        <th scope="col">Name</th>
                        <th scope="col"># Correct</th>
                        <th scope="col">% Correct</th>
                        <th scope="col">Elapsed Time(seconds)</th>
                        <th scope="col">Avg Time Per Question (seconds)</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((record, idx) => {
                        return (
                            <tr>
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
            </table>
        </div>
    );
}

export default Leaderboards;
