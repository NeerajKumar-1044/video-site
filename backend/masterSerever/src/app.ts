import express from 'express'
import { Router } from 'express'
import { registerUser } from './controllers/user.controller'

const app = express()
app.use(express.json({limit:"100kb"}))
const PORT = 5500


app.get("/health-check",(req,res) => {
    res.send("Server is running successfully 👍");
})

app.post("/registerUser",registerUser)
export default app
