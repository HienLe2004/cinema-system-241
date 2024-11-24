const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'cinema-system-241',
    database: 'cinema-system-db',

})

module.exports = mysqlPool;