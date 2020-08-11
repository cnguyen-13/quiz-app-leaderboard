import { TOTAL_QUESTIONS } from '../Config/Config';

function averageTimePer(seconds: number): number {
    const avg = seconds / TOTAL_QUESTIONS;

    return avg;
}

export { averageTimePer }