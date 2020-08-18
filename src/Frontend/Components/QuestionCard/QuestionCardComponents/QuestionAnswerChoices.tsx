import React from "react";
import { decodeHTMLEntities } from "../../../HelperFunctions/HelperFunctions";
interface Props {
    showAnswers?: boolean;
    correctAnswer?: string | null;
    selectedAnswer?: string | null;
    answer_choices: string[];
    changeActive: any;
}

function QuestionAnswerChoices(props: Props) {
    const {
        showAnswers,
        correctAnswer,
        selectedAnswer,
        answer_choices,
        changeActive,
    } = props;

    return (
        <div className="container-fluid">
            <ul className="row list-group user-answers ">
                {showAnswers
                    ? answer_choices.map((choice) => {
                          let bgColor = "";
                          if (correctAnswer === choice)
                              bgColor = "bg-success text-white";
                          else if (
                              selectedAnswer !== correctAnswer &&
                              selectedAnswer === choice
                          )
                              bgColor = "bg-danger text-white";
                          return (
                              <li className={`list-group-item  ${bgColor} `}>
                                  {decodeHTMLEntities(choice)}
                              </li>
                          );
                      })
                    : answer_choices.map((choice) => {
                          return (
                              <li
                                  onClick={changeActive}
                                  className="list-group-item   "
                              >
                                  {decodeHTMLEntities(choice)}
                              </li>
                          );
                      })}
            </ul>
        </div>
    );
}

export default QuestionAnswerChoices;
