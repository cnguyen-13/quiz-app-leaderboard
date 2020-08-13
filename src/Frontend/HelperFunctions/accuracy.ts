import { TOTAL_QUESTIONS } from "../Config/Config";

function accuracy(correct: number): string {
    const accuracy: number = correct / TOTAL_QUESTIONS;
    const percentage: number = accuracy * 100;
    return `${percentage} %`;
}

export { accuracy };
