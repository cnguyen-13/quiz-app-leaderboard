export interface QuestionType {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answer_choices: string[];
    incorrect_answers: string[];
    correct_answer: string;
}

export interface CorrectAnswerAndUserAnswer {
    correctAnswer: string | null;
    userAnswer: string | null;
}

export enum DifficultyType {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
