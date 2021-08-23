
const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const userAuth = require("../middlewares/userAuth");

//signin route (employees/admin)
router.post("/signin", userControllers.signin);

//add employee route (admin only)
router.post("/addemployee", userAuth, adminAuth, userControllers.addEmployee);

//change password router (employees/admin)
router.post("/changepassword", userAuth, userControllers.changePassword)

//update user details (employees/admin)
router.put("/update", userAuth, userControllers.updateUser);

//delete user (admin only)
router.delete("/delete", userAuth, adminAuth,  userControllers.deleteUser);

//send mail (employees/admin)
router.post("/sendmail", )
module.exports = router