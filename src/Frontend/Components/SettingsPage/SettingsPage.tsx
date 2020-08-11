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
        <div className="container-fluid settings-page">
            <Navbar message={'Quiz App'} timer={''} />
            <div className="container margin-top p-5">
                <div className="row">
                    <div className=" col-sm col-xl-6">
                        <div className=" mb-5 text-center text-xl-left" data-aos="fade-up">
                            <h1>Test Your Knowledge Against Others!</h1>
                            <p className="lead">Prove yourself in 3 different difficulty levels and a wide range of categories. Start a quiz of 10 questions by entering your name,
                            selecting your difficulty, and a specific category if desired! Submitting your quiz answers will place you on the leaderboards!</p>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm col-xl-6" data-aos="fade-up" >
                        <h1 className="text-center text-xl-left">Quiz Settings</h1>
                        <div className="form-group">
                            <label className="d-block font-weight-bold" htmlFor="player-name">Name: <span className="text-danger">*</span></label>
                            <input className="d-block form-control" type="text" id="player-name" placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label className="d-block font-weight-bold" htmlFor="player-difficulty">Difficulty: <span className="text-danger">*</span></label>
                            <select className="d-block form-control" id="player-difficulty">
                                <option value={DifficultyType['EASY']}>Easy</option>
                                <option value={DifficultyType['MEDIUM']}>Medium</option>
                                <option value={DifficultyType['HARD']}>Hard</option>
                            </select>

                        </div>

                        <div className="form-group mb-5">
                            <label className="d-block font-weight-bold" htmlFor="player-category">Category: <span className="text-danger">*</span></label>
                            <select className="d-block form-control" id="player-category">
                                {categories.map(category => {
                                    return (<option value={category[1]}>{category[0]}</option>)
                                })}

                            </select>

                        </div>
                        <div>
                            <button className="btn btn-lg btn-outline-primary w-100 font-weight-bold text-uppercase" onClick={startGame}>Start Game</button>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default SettingsPage
