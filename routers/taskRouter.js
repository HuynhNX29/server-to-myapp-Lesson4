import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  addNewTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskControllers.js";
import logger from "../middlewares/logger.js";

import TaskModel from "../models/TaskModel.js";

const taskRouter = Router();

// taskRouter.get("/tasks", (req, res) => {
//   res.send("fafafa");
// });

taskRouter.use(verifyToken); //yeu cau su dung cho tat ca router

taskRouter.post("/add-new-task", addNewTask);

// taskRouter.get("/get-tasks",logger, getTasks ); //chi su dung cho router nay

// taskRouter.get("/get-tasks", getTasks);

taskRouter.get("/get-tasks", getTasks);

taskRouter.put("/update-task", updateTask);

taskRouter.delete("/remove-task", deleteTask);

export default taskRouter;
