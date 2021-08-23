
const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("../models/taskModel");

//________________________
//------------------------

//create task
module.exports.createTask = async (req, res) => {
  try { 
    const {name, description, startDate, completionDate, one.name, one.employeeId two.name, two.employeeId three.name, three.employeeId} = req.body; 
    
    const lastTask = taskModel.find().sort({_id: -1});
    
    if(!lastTask) {
      const taskId = "TK-00001";
    }
    else {
      const lastId = lastTask.taskId;
      const num = lastId.slice(4);
      const newNum = parseInt(num) + 1;
      const newNumString = newNum.toString();
      const taskId = "TK-" + newNumString; 
    
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
module.exports.viewAllTasks = async (req, res) => {
  try { 
    const tasks = await taskModel.find();
    const completedTasks = tasks.filter(task=> task.status == "completed").length;
    tasksOnHold = tasks.filter(task => task.status == "onHold").length;
    totalTasks = tasks.length;
    
    return res.status(201).json({completedTasks, tasksOnHold, totalTasks, tasks})
  } catch(error) {
    return res.status(500).send(error);
  }
}

//________________________
//------------------------

module.exports.viewSpecificTask = async (req, res) => {
  try {
    task = await taskModel.fineById(req.params.task-id);
    return res.status(201).json(task);
  } catch(error) {
    return res.status(500).send(error);
  }
}

//________________________
//------------------------

module.exports.editTask = async (req, res) => {
  const task = taskModel.findById(req.params.task-id};
  
  task.name = req.body.name ? req.body.name : task.name;
  task.description = req.body.description ? req.body.description : task.description;
  task.startDate = req.body.startDate ? req.body.startDate : task.startDate;
  task.completionDate = req.body.completionDate ? req.body.completionDate : task.completionDate;
  task.one = req.body.one ? req.body.one : task.one;
  task.two = req.body.two ? req.body.two : task two;
  task.three = req.body.three ? req.body.three : task.three;
  
  await task.save();
  return res.status(201).send("task updated")
}

module.exports.deleteTask = async (req, res) => {
  try {
    task = await taskModel.findByIdAndDelete(req.params.task_id);
    
    if(!task) return res.status(400).send("No task found");
    
    sendmail(task.one)
  } catch(error) {
    return res.status(500).send(error);
  }
}