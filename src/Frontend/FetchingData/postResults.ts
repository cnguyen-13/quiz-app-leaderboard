import { PostData } from "../Types/Types";

async function postResults(data: PostData) {
    const postSettings = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    fetch("http://localhost:4000/api/leaderboards/", postSettings);
}

export { postResults };
