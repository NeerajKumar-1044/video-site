import { log } from "console";
import express from 'express'

const app = express()
const PORT = 5500

app.get("/",(req,res) => {
    log("fll")
    res.send("hello")
})

app.listen(3000,() => {
    log("server is running on port:- 3000");
})
