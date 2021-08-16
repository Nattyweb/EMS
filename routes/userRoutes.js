
const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userAuth = require("../middlewares/userAuth");

//signin route
router.post("/signin", userControllers.signin);

//add employee route
router.post("/addemployee", userControllers.addEmployee);

//change password router
router.post("/changepassword", userAuth, userControllers.changePassword)

//update user details
router.put("/update", userAuth, userControllers.updateUser);

//delete user 
router.delete("/delete", userAuth,  userControllers.deleteUser);

module.exports = router