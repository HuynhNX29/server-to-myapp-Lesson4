import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  res.send("Login successfully");
};

const register = async (req, res) => {
  const body = req.body;
  const { username, password } = body;

  if (!password || !username) {
    throw new Error("Missing username or password");
  }

  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    throw new Error("User is already registered");
  }

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hashPassword(password, salt);

  const newUser = new UserModel({
    username,
    password: hashPassword,
  });

  await newUser.save();

  res.status(201).json({
    message: "Successfully registered",
    data: {
      username,
      accesstoken: "",
    },
  });
  // res.send("Register successfully");
};

export { login, register };
