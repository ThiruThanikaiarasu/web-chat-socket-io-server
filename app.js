require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500

const rooms = ['general', 'tech', 'finance', 'crypto'] 

const cors = require('cors')
const mongoose = require('mongoose')
const { error } = require('console')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Establishing Connection to MongoDB
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on( "error", (error) => console.log(error))
db.once( "open", () => console.log("Connection Established"))

// Establishing Connection to Socket
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors : {
        origin : 'http://localhost:5173',
        methods : ['GET', 'POST']
    }
})

server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))