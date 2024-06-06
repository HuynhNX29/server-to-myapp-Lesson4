const logger = (req, res, next) => {
  console.log("New request");
  next();
};

export default logger;
