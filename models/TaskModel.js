import mongoose, { Schema } from "mongoose";

const TaskScheme = new Schema({
  content: {
    type: String,
    require: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },

  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

const TaskModel = mongoose.model("tasks", TaskScheme);
export default TaskModel;
