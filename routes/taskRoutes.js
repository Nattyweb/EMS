
const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/taskControllers");
const userAuth = require("../middlewares/userAuth");

//signin route
router.post("/create", taskControllers.createTask);

//add employee route
router.get("/view", taskControllers.viewAlltasks);

//change password router
router.get("/view:task-id", userAuth, taskControllers.viewSpecificTask)

//update user details
router.put("/edit:task-id", userAuth, taskControllers.editTask);

//delete user 
router.delete("/delete:task-id", userAuth,  userControllers.deleteUser);

module.exports = router