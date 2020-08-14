async function getFromLeaderboards() {
    const data = await (await fetch("/api/leaderboards")).json();
    console.log(data);
}

export { getFromLeaderboards };
