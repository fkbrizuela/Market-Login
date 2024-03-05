const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "test2"
})

app.listen(3001, ()=>{
    console.log("servidor corriendo en el puerto 3001")
})