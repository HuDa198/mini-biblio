import express from 'express'
import mongoose from 'mongoose'
import clientRoute from './routes/client.js'
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.port || 3003

mongoose.connect(process.env.URL_MONGOOSE)
.then(() => {
    console.log('Coonected to mongo')
})
.catch((err) => {
    console.log('Unable to connect to mongo')
})

app.use('/api/v1/client', clientRoute)

app.listen(port,(err)=>{
    if(!err) console.log("server client ok")
    else console.log('server client ')
})