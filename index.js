import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routers/authRouter.js";
import taskRouter from "./routers/taskRouter.js";
import logger from "./middlewares/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//tasks
const dburl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5dczgfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


//users



app.use(express.json());
app.use(cors());

app.get("/", logger, (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.use("/api-v1/auth", authRouter);

app.use("/api-v1/tasks", taskRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("Connect to database successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//connect db successfully after that connect to server
connectDB().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`Server is starting at http://localhost:${PORT}`);
  });
});

// Lesson5: MVC
