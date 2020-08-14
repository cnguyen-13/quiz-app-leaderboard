function decodeHTMLEntities(str: string): string {
    const entities = [
        ["&quot;", '"'],
        ["&#039;", "'"],
        ["&rsquo;", "'"],
        ["&amp;", "&"],
        ["&ldquo;", '"'],
        ["&eacute;", "é"],
        ["&Uuml;", "Ü"],
    ];
    let resultStr: string = str;
    for (let i = 0; i < entities.length; i++) {
        const pair = entities[i];
        while (resultStr.includes(pair[0])) {
            resultStr = resultStr.replace(pair[0], pair[1]);
        }
    }
    return resultStr;
}

export { decodeHTMLEntities };
