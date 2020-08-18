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

//Gets sorted results from database
db.getRankings = (difficulty) => {
    return new Promise((resolve, reject) => {
        //Sets up the WHERE filter clause in the query
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

//Posts quiz results into database
db.postQuizResults = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO leaderboards 
            (name, num_correct, percentage, time_seconds, time_per_question_seconds, difficulty) 
            VALUES (?, ?, ?, ?, ?, ? )`,
            [
                data.name,
                data.num_correct,
                data.percentage,
                data.time_seconds,
                data.time_per_question_seconds,
                data.difficulty,
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
