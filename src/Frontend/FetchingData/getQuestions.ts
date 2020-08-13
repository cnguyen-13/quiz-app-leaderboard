import { DifficultyType, QuestionType } from "./../Types/Types";
import { TOTAL_QUESTIONS } from "../Config/Config";
import { shuffleArray } from "../HelperFunctions/shuffleArray";

async function getQuestions(
    difficulty: DifficultyType,
    category: string,
    callback: React.Dispatch<React.SetStateAction<QuestionType[]>>
) {
    //Fetch Data
    const data = await (
        await fetch(
            `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&difficulty=${difficulty}${category}`
        )
    ).json();
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

export { getQuestions };
