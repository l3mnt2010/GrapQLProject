require('dotenv').config()
const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) reject(err);
                console.log('Connected to MySQL database');
                resolve();
            });
        });
    }

    async disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) reject(err);
                console.log('Disconnected from MySQL database');
                resolve();
            });
        });
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';
            this.connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ?';
            this.connection.query(query, [username], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async getAllCourses() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM khoahoc';
            this.connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async getCourseById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM khoahoc WHERE id = ?';
            this.connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async getAllSubjects() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM monhoc';
            this.connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async getSubjectById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM monhoc WHERE id = ?';
            this.connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async getAllQuestions() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM cauhoi';
            this.connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async getQuestionById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM cauhoi WHERE id = ?';
            this.connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async getAnswersForQuestion(questionId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM phuongan WHERE cau_hoi_id = ?';
            this.connection.query(query, [questionId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = Database;
