import express from 'express'
import DBconnection from './db/db.js'
import router from './router/auth.router.js'
import dotenv from "dotenv"
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000
dotenv.config()

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true, 
}))

app.use("/api/user",router)

app.listen(port,()=>{
    DBconnection()
    console.log(`App is runing port on ${port}`);
})



export default app