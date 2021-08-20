const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");


const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return res.status(403).send("You are not signed in, sign in to continue");
  
  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!validToken) return res.status(400).send("signin to continue");
    const user = await userModel.findById(validToken.id)
    console.log(user)
    req.user = user
    next();
 
  } catch (err) {
    return res.status(401).send(err);
  }
};

module.exports = verifyToken;