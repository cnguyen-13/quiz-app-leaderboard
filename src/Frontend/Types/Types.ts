export interface QuestionType {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answer_choices: string[];
    incorrect_answers: string[];
    correct_answer: string;
}

export interface AnswerPairType {
    correctAnswer: string | null;
    userAnswer: string | null;
}

export interface PostDataType {
    difficulty: string;
    name: string;
    num_correct: number;
    percentage: string;
    time_seconds: number;
    time_per_question_seconds: number;
}

export enum DifficultyType {
    ALL = "all",
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
