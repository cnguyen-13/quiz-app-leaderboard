import React, { useState } from 'react';
import SettingsPage from './Components/SettingsPage/SettingsPage';
import QuizPage from './Components/QuizPage/QuizPage';
import { QuestionType, DifficultyType } from './Types/Types';
import { getQuestions } from './FetchingData/getQuestions';


function App() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [player, setPlayer] = useState<string>('');
    const [didGameStart, setDidGameStart] = useState<boolean>(false);

    function startGame() {
        //Inputs Elements
        const playerNameInput: any = document.querySelector('#player-name');
        const playerDifficultyInput: any = document.querySelector('#player-difficulty');
        const playerCategoryInput: any = document.querySelector('#player-category');

        //Values at Inputs
        const playerName: string = playerNameInput.value;
        const playerDifficulty: DifficultyType = playerDifficultyInput.value;
        const playerCategory: string = playerCategoryInput.value;

        //Checks for names for no spaces and length
        if (playerName.indexOf(' ') === -1 && playerName.length >= 1) {
            setPlayer(playerName);
            getQuestions(playerDifficulty, playerCategory, setQuestions);
            setDidGameStart(true);
        } else {
            alert('Name must have no spaces and be 1 character long')
        }
    }

    return (
        <div className="app container-fluid">
            {didGameStart ? <QuizPage questions={questions} playerName={player} /> : <SettingsPage startGame={startGame} />}
        </div>
    );
}

export default App;
