const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
  const headers = req.headers.authorization;
  try {
    if (headers) {
      jwt.verify(headers, "app", (err, decoded) => {
       next();
      });
    } else {
      res.send({ msg: "Please Login Again !" });
    }
  } catch (error) {
    res.send("Please Login Again !!");
  }
};
module.exports = { auth };
