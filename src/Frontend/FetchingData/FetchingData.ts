import { DifficultyType, QuestionType, PostDataType } from "./../Types/Types";
import { TOTAL_QUESTIONS } from "../Config/Config";
import { shuffleArray } from "../HelperFunctions/HelperFunctions";

const protocol = window.location.protocol;
const hostName = window.location.hostname;
const port = require("../../Backend/serverconfig");

//GETs questions from the opentdb API
async function getQuestions(
    difficulty: DifficultyType,
    category: string,
    callback: React.Dispatch<React.SetStateAction<QuestionType[]>>
) {
    const endpointUrl = `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&difficulty=${difficulty}${category}`;
    const data = await (await fetch(endpointUrl)).json();
    const questionsArray: QuestionType[] = data["results"];

    //Adds property answer_choices, just incorrect answers and correct answer together, shuffled
    const questions: QuestionType[] = questionsArray.map((question) => {
        question["answer_choices"] = shuffleArray([
            ...question["incorrect_answers"],
            question["correct_answer"],
        ]);
        return question;
    });
    callback(questions);
}

//GETs data from leaderboards database
async function getFromLeaderboards(
    difficulty: DifficultyType,
    callback: React.Dispatch<React.SetStateAction<any[]>>
) {
    const endpointUrl = `${protocol}//${hostName}:${port}/api/leaderboards/${difficulty}`;
    try {
        const data = await (await fetch(endpointUrl)).json();
        callback(data);
    } catch (err) {
        console.log(err);
    }
}

//POSTs quiz results to the database
async function postResults(data: PostDataType) {
    const endpointUrl = `${protocol}//${hostName}:${port}/api/leaderboards/`;
    const postSettings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    fetch(endpointUrl, postSettings);
}

export { getFromLeaderboards, getQuestions, postResults };
