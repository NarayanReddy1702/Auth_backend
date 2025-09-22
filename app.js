import express from 'express'
import DBconnection from './db/db.js'
import router from './router/auth.router.js'
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

app.use(express.json())

app.use(cors({
    origin:"https://guileless-moxie-73d900.netlify.app"
}))

app.use("/api/user",router)

app.listen(port,()=>{
    DBconnection()
    console.log(`App is runing port on ${port}`);
})



export default app