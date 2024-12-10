const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const db = require('./config/db')
//___________CONFIG_ENVIRONMENT_____________
dotenv.config()

//____________FRAMEWORK_EXPRESS____________
const app = express()

//_______________MIDDLEWARES__________________
app.use(morgan("dev"));
app.use(express.json());

//________________ROUTES_________________
app.get('/v', (req,res) => {
    res.status(200).send('<h1>Backend server version 1.2</h1>')
})
app.use('/api/v1', require("./routes/phim.Routes"))
app.use('/api/v1', require("./routes/daodien.Routes"))
app.use('/api/v1', require("./routes/dienvien.Routes"))
app.use('/api/v1', require("./routes/theloai.Routes"))



//________________CHECK_DB_AND_RUN_SERVER_________________
const PORT = process.env.PORT || 8080

db.query('SELECT * FROM PHIM').then(() => {
    console.log('MySQL DB is connected.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}....`)
    })
}).catch((err) => {
    console.log(err);
})

