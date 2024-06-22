const express = require('express')
const mongoose = require('mongoose')
const path =  require('path')
require('dotenv').config()
const authRoutes = require('./Routes/auth.Routes')


const app = express();
const DB = process.env.DB

app.use(express.json())
const Port = process.env.Port || 3000

mongoose.connect(DB).then(()=>{
    console.log('MongoDB is connected')
}).catch(()=>{
    console.log('MongoDB is not connected')
})

app.get('/',(req,res)=>{
    res.send(`
         <html>
            <body>
                <center>
                <h1> Well Come</h1>
                </center>
            <body>
        <html>
        `)
})

app.use(authRoutes)

app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`)
})