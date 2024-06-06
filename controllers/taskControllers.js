import TaskModel from "../models/TaskModel.js";

const addNewTask = async (req, res) => {
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
};

const getTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.status(200).json({
      message: "Get Tasks successfully",
      data: tasks,
    });
  }


  const updateTask = async (req, res) => {
    const { id } = req.query;
    const { content } = req.body;
  
    // console.log(id);
  
    await TaskModel.findByIdAndUpdate(id, { content });
    res.status(203).json({
      message: "Updated",
      data: [],
    });
    // res.send("asdf");
  }


  const deleteTask = async (req, res) => {
    const { id } = req.query;
  
    await TaskModel.findByIdAndDelete(id);
  
    res.status(205).json({
      message: "Removed",
      data: [],
    });
  }

export { addNewTask, getTasks, updateTask, deleteTask };
