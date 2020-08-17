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

db.getByDifficulty = (difficulty) => {
    return new Promise((resolve, reject) => {
        //queries here
        const difficultyWhereClause =
            difficulty === "all"
                ? 'IN ("easy", "medium", "hard")'
                : `= "${difficulty}"`;

        pool.query(
            `SELECT name, num_correct, percentage, time_seconds, time_per_question_seconds 
            FROM leaderboards 
            WHERE difficulty ${difficultyWhereClause}
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
            `INSERT INTO leaderboards 
            (name, num_correct, percentage, time_seconds, time_per_question_seconds, difficulty) 
            VALUES (?, ?, ?, ?, ?, ? )`,
            [
                name,
                num_correct,
                percentage,
                time_seconds,
                time_per_question_seconds,
                difficulty,
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
