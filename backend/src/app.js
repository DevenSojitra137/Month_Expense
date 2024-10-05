import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import router from "./routes/expense.route.js"
import router1 from "./routes/user.route.js";

app.use("/api/v1/user", router1)
app.use("/api/v2/expense", router)

export {app};