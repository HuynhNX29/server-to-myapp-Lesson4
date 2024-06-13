const logger = (req, res, next) => {
  const { id } = req.query;
  if (id) {
    console.log("New request");
    next();
  } else {
    res.status(401).json({
      message: "Unauthorization",
    });
  }
};

export default logger;
