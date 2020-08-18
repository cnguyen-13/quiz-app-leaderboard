import { TOTAL_QUESTIONS } from "../Config/Config";

function accuracy(correct: number): string {
    const accuracy: number = correct / TOTAL_QUESTIONS;
    const percentage: number = accuracy * 100;
    return `${percentage} %`;
}

function averageTimePer(seconds: number): number {
    const avg = seconds / TOTAL_QUESTIONS;
    return avg;
}

function formatTime(sec: number): string {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    const secondsStringed = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${secondsStringed}`;
}

function shuffleArray(arr: any[]): any[] {
    const newArray = arr;
    for (let i = 0; i < newArray.length; i++) {
        const temp = newArray[i];
        const ranIdx = Math.floor(Math.random() * newArray.length);
        newArray[i] = newArray[ranIdx];
        newArray[ranIdx] = temp;
    }
    return newArray;
}

function decodeHTMLEntities(str: string): string {
    const entities = require("../Data/HTMLEntities");
    let resultStr: string = str;
    for (let i = 0; i < entities.length; i++) {
        const pair = entities[i];
        while (resultStr.includes(pair[0])) {
            resultStr = resultStr.replace(pair[0], pair[1]);
        }
    }
    return resultStr;
}

export {
    accuracy,
    averageTimePer,
    formatTime,
    shuffleArray,
    decodeHTMLEntities,
};
