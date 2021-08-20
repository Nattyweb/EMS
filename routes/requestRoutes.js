
const express = require('express');
const router = express.Router();
const requestControllers = require("../controllers/requestControllers");
const userAuth = require("../middlewares/userAuth");

//create leave  request (employee action)
router.post("/leave/create", userAuth, requstControllers.makeLeaveRequest);

//update Leave Request (employee action)
router.put("/leave/edit:request-id", userAuth, requestControllers.updateLeaveRequest)

//view specific leave request (employee/admin)
router.get("/leave/view:request-id", userAuth, adminAuth, requestControllers.viewSpecificLeaveRequest);

//manage leave request (admin action)
router.post("/leave/manage:request-id", userAuth, adminAuth, requestControllers.manageLeaveRequest);

//delete leave request (employee action)
router.delete("/delete:request-id", userAuth, requestControllers.deleteLeaveRequest);

//create a task completion request (employee action)
router.post("/taskcompletion/create", userAuth, taskControllers.viewAlltasks);

//edit task completion request (employee action)
router.put("/taskcompletion/edit:request-id", userAuth, requestControllers.updateTaskCompletionRequest);

//manage task completion request (admin function)
router.post("/taskcompletion/manage:request-id", userAuth, adminAuth, requestControllers.manageTaskCompletionRequest);

//view all task completion request (admin action)
router.post("/taskcompletion/view", userAuth, adminAuth, requestControllers.viewAllTaskCompletionRequest);

//view specific task completion request (employee/admin action)
router.get("/taskcompletion/view:request-id", userAuth, requestControllers.viewSpecificTaskCompletion)

//my requests (employee action)
router.post("/myrequests", userAuth, requestControllers.myRequests);

module.exports = router