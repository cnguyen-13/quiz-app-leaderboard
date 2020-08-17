const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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
            ORDER BY num_correct DESC, time_seconds ASC;`,
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
            `SELECT name, num_correct, percentage, time_seconds, time_per_question_seconds FROM ${difficulty}_leaderboards 
            ORDER BY num_correct DESC, time_seconds DESC;`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    });
};

db.postQuiz = (data) => {
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
            `INSERT INTO ${difficulty}_leaderboards 
            (name, num_correct, percentage, time_seconds, time_per_question_seconds) 
            VALUES (?, ?, ?, ?, ? )`,
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
