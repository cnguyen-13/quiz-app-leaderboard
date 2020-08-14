const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Quicksilver13!!@",
    database: "quiz_app_leaderboards",
});

const db = {};

db.getAllTogether = () => {
    return new Promise((resolve, reject) => {
        //queries here
        pool.query(
            `SELECT name, num_correct, percentage, time_seconds, time_per_question_seconds FROM easy_leaderboards  
            UNION 
            SELECT name, num_correct, percentage, time_seconds, time_per_question_seconds FROM medium_leaderboards
            UNION 
            SELECT name, num_correct, percentage, time_seconds, time_per_question_seconds FROM hard_leaderboards 
            ORDER BY num_correct ASC;`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
};

db.getAllFromDifficulty = (difficulty) => {
    return new Promise((resolve, reject) => {
        //queries here
        pool.query(
            `SELECT name, num_correct, percentage, time_seconds, time_per_question_seconds FROM ${difficulty}_leaderboards`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
};

db.postQuizByDifficulty = (data) => {
    return new Promise((resolve, reject) => {
        //queries here
        const {
            difficulty,
            name,
            num_correct,
            percentage,
            time_seconds,
            time_per_question_seconds,
        } = data;
        pool.query(
            `INSERT INTO ${difficulty}_leaderboards (name, num_correct, percentage, time_seconds, time_per_question_seconds) VALUES (?, ?, ?, ?, ? )`,
            [
                name,
                num_correct,
                percentage,
                time_seconds,
                time_per_question_seconds,
            ],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
};
module.exports = db;
