import { DifficultyType } from "./../Types/Types";

async function getFromLeaderboards(
    difficulty: DifficultyType,
    callback: React.Dispatch<React.SetStateAction<any[]>>
) {
    const difficultyLevel = difficulty === "all" ? "" : difficulty;
    const endpointUrl = `http://localhost:4000/api/leaderboards/${difficultyLevel}`;
    try {
        const data = await (await fetch(endpointUrl)).json();
        callback(data);
    } catch (err) {
        console.log(err);
    }
}

export { getFromLeaderboards };
