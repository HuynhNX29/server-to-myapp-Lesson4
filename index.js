import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import TaskModel from "./models/TaskModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const dburl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5dczgfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(cors());

app.post("/add-new-task", async (req, res) => {
  const { content } = req.body;
  if (!content) {
    throw new Error("Missing content");
  }

  const newTask = new TaskModel({
    content,
  });

  await newTask.save();

  res.status(200).json({
    message: "Create new  tasks successfully",
    data: newTask,
  });
});

app.get("/get-tasks", async (req, res) => {
  const tasks = await TaskModel.find();
  res.status(200).json({
    message: "Get Tasks successfully",
    data: tasks,
  });
});

app.put("/update-task", async (req, res) => {
  const { id } = req.query;
  const { content } = req.body;

  // console.log(id);

  await TaskModel.findByIdAndUpdate(id, { content });
  res.status(203).json({
    message: 'Updated',
    data: []
  })
  // res.send("asdf");
});

app.delete('/remove-task', async(req, res) => {
  const {id} = req.query

  await TaskModel.findByIdAndDelete(id)

  res.status(205).json({
    message: 'Removed',
    data: []
  })
})

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
