import { Schema } from "mongoose";
import mongoose from "mongoose";


const UserScheme = new Schema({
  username: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
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

const UserModel = mongoose.model("users", UserScheme);

export default UserModel;
