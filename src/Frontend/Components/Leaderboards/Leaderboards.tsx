import React, { useState, useEffect } from "react";
import { DifficultyType } from "../../Types/Types";

interface Props {}

function Leaderboards(props: Props) {
    const {} = props;
    const [results, setResults] = useState();
    const [difficulty, setDifficulty] = useState<DifficultyType>(
        DifficultyType["ALL"]
    );

    useEffect(() => {}, [difficulty]);

    return <div className="leaderboards"></div>;
}

export default Leaderboards;
