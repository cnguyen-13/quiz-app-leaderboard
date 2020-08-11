import React from 'react'
import { QuestionType } from '../../Types/Types';
import { decodeHTMLEntities } from '../../HelperFunctions/decodeHTMLEntities';

interface Props {
    question: QuestionType
    questionNum: number;
    showAnswers?: boolean;
    correctAnswer?: string | null,
    selectedAnswer?: string | null,
}

function QuestionCard(props: Props) {
    const { question, questionNum, showAnswers, correctAnswer, selectedAnswer } = props
    const { category, answer_choices } = question;
    const theQuestion = question['question'];
    function changeActive(e: any): void {
        //Change all other items to inactive
        const parentUlElement = e.target.parentElement;
        const childrenElements = parentUlElement.childNodes;
        for (let i = 0; i < childrenElements.length; i++) {
            const child = childrenElements[i];
            child.classList.remove('active')
        }

        //Change the clicked item to active
        e.target.classList.add('active')

    }
    //2 cases: correctAnswer === selectedAnswer && correctAnswer !== selectedAnswer

    return (
        <div className="quiz-question mb-5" data-aos="fade-up" >
            <h3 className="font-weight-500">{questionNum}: {decodeHTMLEntities(theQuestion)}</h3>
            <p className="text-muted">{category}</p>

            <div className="container-fluid">
                <ul className="row list-group user-answers " >
                    {showAnswers ? answer_choices.map(choice => {
                        let bgColor = '';
                        if (correctAnswer === choice) bgColor = 'bg-success text-white';
                        else if (selectedAnswer !== correctAnswer && selectedAnswer === choice) bgColor = 'bg-danger text-white';
                        return (
                            <li className={`list-group-item  ${bgColor} `}>
                                {decodeHTMLEntities(choice)}
                            </li>
                        )

                    })
                        : answer_choices.map(choice => {
                            return (
                                <li onClick={changeActive} className="list-group-item ">
                                    {decodeHTMLEntities(choice)}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )



}

export default QuestionCard
