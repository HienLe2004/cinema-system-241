const express = require('express')

const app = express()

app.get('/v', (req,res) => {
    res.status(200).send('<h1>Backend server version 1.0</h1>')
})

const PORT = 8080

app.listen(PORT, () => {
    console.log("Server is running....")
})