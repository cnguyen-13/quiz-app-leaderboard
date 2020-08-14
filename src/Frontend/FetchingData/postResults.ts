import { PostData } from "../Types/Types";

async function postResults(data: PostData) {
    const postSettings = {
        method: "post",
        body: JSON.stringify(data),
    };

    fetch("/api/leaderboards", postSettings);
}

export { postResults };

//POST TO: /api/leaderboards

// const {
//     difficulty,
//     name,
//     num_correct,
//     percentage,
//     time_seconds,
//     time_per_question_seconds,
// } = data;
// pool.query(
//     `INSERT INTO ${difficulty}_leaderboards (name, num_correct, percentage, time_seconds, time_per_question_seconds) VALUES (?, ?, ?, ?, ? )`,
//     [
//         name,
//         num_correct,
//         percentage,
//         time_seconds,
//         time_per_question_seconds,
//     ],
