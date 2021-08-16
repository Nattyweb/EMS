
const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");

//________________________
//------------------------

//create task
module.exports.createTask = async (req, res) => {
  try { 
    const {taskId, name, description, startDate, completionDate, one.name, one.employeeId two.name, two.employeeId three.name, three.employeeId} = req.body; 
    
    const newTask = {
      taskId,
      name,
      description,
      startDate,
      completionDate,
      assignedTo.one.name: one.name,
      assignedTo.one.employeeId: one.employeeId,
      assignedTo.two.name: two.name,
      assignedTo.two.employeeId: two.employeeId,
      assignedTo.three.name: three.name,
      assignedTo.three.employeeId: three.employeeId
      status: 
    }
    
    task = await new taskModel(newTask)
    await task.save();
    
    const userOne = await usermodel.findOne({accountDetails.employeeId: one.employeeId})
    
    sendAssignedTaskMail(userOne.email);
    return res.status(201).send("Task  successfully created");
  } catch(error) {
    return res.status(500).send(error)
  }
}

//view all tasks
module.exports.viewAllTasks = (req, res) => {
  try {
    
  } catch(error) {
    return res.status(500).send(error);
  }
}