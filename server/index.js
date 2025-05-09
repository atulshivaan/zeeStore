import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.connection.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import productRouter from "./routes/products.routes.js";


dotenv.config();


const app =express();
const port = process.env.PORT;



//middleware
app.use(morgan("dev"))
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));


app.use("/api/auth",userRouter)
app.use("/api/product",productRouter)



app.listen(port,(req,res)=>{
    connectDB();
    console.log(`Server is running on ${port}`);
    
})
