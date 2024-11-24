const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'mysql-cinema-system-241-hcmut-cinema-system-241.b.aivencloud.com',
    port: 28330,
    user: 'user2',
    password: 'AVNS_8TY2opuKeaD4QTG2Y6x',
    database: 'cinema-system-241'
})

module.exports = db;