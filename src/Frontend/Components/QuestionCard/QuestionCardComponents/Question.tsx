import React from "react";
import { decodeHTMLEntities } from "../../../HelperFunctions/HelperFunctions";

interface Props {
    questionNum: number;
    theQuestion: string;
    category: string;
}

function Question(props: Props) {
    const { questionNum, theQuestion, category } = props;

    return (
        <>
            <h3 className="font-weight-500">
                {questionNum}: {decodeHTMLEntities(theQuestion)}
            </h3>
            <p className="text-muted">{category}</p>
        </>
    );
}

export default Question;
