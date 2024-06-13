import { Schema } from "mongoose";

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

const UserModel = mongoose.model("userss", UserScheme);

export default UserModel;
