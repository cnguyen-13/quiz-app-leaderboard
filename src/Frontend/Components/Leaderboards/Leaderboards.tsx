import React, { useState, useEffect } from "react";
import { DifficultyType } from "../../Types/Types";
import { getFromLeaderboards } from "../../FetchingData/FetchingData";
import DifficultyInput from "./LeaderboardsComponents/DifficultyInput";
import Table from "./LeaderboardsComponents/Table";

function Leaderboards() {
    const [results, setResults] = useState<any[]>([]);
    const [difficulty, setDifficulty] = useState<DifficultyType>(
        DifficultyType["ALL"]
    );

    useEffect(() => {
        getFromLeaderboards(difficulty, setResults);
    }, [difficulty]);

    return (
        <div className="container from-navbar-offset-mt">
            <DifficultyInput setDifficulty={setDifficulty} />
            <Table results={results} />
        </div>
    );
}

export default Leaderboards;
