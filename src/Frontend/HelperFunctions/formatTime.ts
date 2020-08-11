const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    const secondsStringed = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${secondsStringed}`;
};

export { formatTime }