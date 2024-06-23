import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const accesstoken = req.headers.authorization;

    // console.log(req.headers);
    // console.log(accesstoken);

    const token = accesstoken.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Unauthorization");
    }

    // console.log(token);

    const isVerify = jwt.verify(token, process.env.SECRET_KEY);

    console.log(isVerify);

    if (isVerify) {
      req.uid = isVerify.id;
      next();
    } else {
      res.status(403);
      throw new Error("Access token is not valid");
    }

    // console.log(token);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export default verifyToken;
