import React from 'react';
import { DifficultyType } from '../../Types/Types';
import { categories } from '../../HelperFunctions/categories';
import Navbar from '../QuizPage/Navbar';

interface Props {
    startGame: any,

}

function SettingsPage(props: Props) {
    const { startGame } = props

    return (
        <>
            <Navbar message={'Quiz App'} timer={'1'} />
            <div className="settings">
                <h1>Quiz Settings</h1>
                <div className="form-group">
                    <label className="d-block" htmlFor="player-name">Name:</label>
                    <input className="d-block form-control" type="text" id="player-name" placeholder="Your name" />
                </div>
                <div className="form-group">
                    <label className="d-block" htmlFor="player-difficulty">Difficulty:</label>
                    <select className="d-block form-control" id="player-difficulty">
                        <option value={DifficultyType['EASY']}>Easy</option>
                        <option value={DifficultyType['MEDIUM']}>Medium</option>
                        <option value={DifficultyType['HARD']}>Hard</option>
                    </select>

                </div>

                <div className="form-group">
                    <label className="d-block" htmlFor="player-category">Category:</label>
                    <select className="d-block form-control" id="player-category">
                        {categories.map(category => {
                            return (<option value={category[1]}>{category[0]}</option>)
                        })}

                    </select>

                </div>
                <div>
                    <button className="btn btn-lg btn-primary w-100 font-weight-bold text-uppercase" onClick={startGame}>Start Game</button>
                </div>

            </div>
        </>
    )
}

export default SettingsPage
