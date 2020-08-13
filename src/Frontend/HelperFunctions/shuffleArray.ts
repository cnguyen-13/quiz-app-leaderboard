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

export { shuffleArray };
