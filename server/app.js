import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/routes.js"

const app = express()

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}))
app.use(express.json())
app.use(cookieParser())

app.use("/", router)

export default app