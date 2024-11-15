const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');
const { error } = require('console');
const app = express()
const cookieParser = require('cookie-parser');

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));



app.get('/',(req,res)=>{
    res.send("hello")
})


//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()