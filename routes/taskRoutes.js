
const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/taskControllers");
const userAuth = require("../middlewares/userAuth");

//create task (admin only)
router.post("/create", userAuth, taskControllers.createTask);

//view all tasks (admin only)
router.get("/view", userAuth, adminAuth, taskControllers.viewAlltasks);

//view specific task (employee/admin)
router.get("/view:task-id", userAuth, taskControllers.viewSpecificTask)

//update task (admin only)
router.put("/edit:task-id", userAuth, adminAuth, taskControllers.editTask);

//delete task
router.delete("/delete:task-id", userAuth,  adminAuth, taskControllers.deleteTask);

//my tasks (employee only)

module.exports = router