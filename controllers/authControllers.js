import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { JWT } from "../ultils/getJsonWebToken.js";

//login
const login = async (req, res) => {
  // res.send("Login successfully");

  try {
    const body = req.body;
    // console.log(body);
    const { username, password } = body;

    if (!password || !username) {
      throw new Error("Missing username or password");
    }

    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
      res.status(401);
      throw new Error("User not found");
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isMatchPassword) {
      res.status(402);

      throw new Error("Password is not match");
    }

    res.status(200).json({
      message: "Welcome back",
      data: {
        username,
        _id: existingUser._id,
        accesstoken: JWT.GetJWT({ id: existingUser._id, username }),
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    // throw new Error(error);
    // console.log(error);
  }
};

//register
const register = async (req, res) => {
  const body = req.body;
  // console.log(body);
  const { username, password } = body;

  if (!password || !username) {
    throw new Error("Missing username or password");
  }

  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    throw new Error("User is already registered");
  }

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashPassword,
  });

  await newUser.save();

  res.status(201).json({
    message: "Successfully registered",
    data: {
      username,
      accesstoken: JWT.GetJWT({ id: newUser._id, username }),
    },
  });
  // res.send("Register successfully");
};

export { login, register };
