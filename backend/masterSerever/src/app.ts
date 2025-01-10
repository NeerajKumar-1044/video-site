import express from 'express'

const app = express()
const PORT = 5500

app.get("/health-check",(req,res) => {
    res.send("Server is running successfully 👍");
})


export default app
