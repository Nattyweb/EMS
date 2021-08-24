
const mongoose = require("mongoose");
const Joi = require("joi");
const express = ("express");
const leaveRequestModel = require("../models/leaveRequestModel");
const taskCompletionRequestModel = require("../models/taskCompletionRequestModel");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");

//_______________________________
//-------------------------------

module.exports.makeLeaveRequest = async (req, res) => {
  try {
    
    const schema = Joi.object().keys({
      name: Joi.String.required,
      employeeId: Joi.string.required,
      reason: Joi.string.rquired,
      startDate: Joi.string.requird,
      resumptionDate: Joi.string.required
    });
    
    const lastRequest = leaveRequestModel.find().sort({_id: -1});
    
    if(!lastRequest) {
      const requestId = "LRQ-00001";
    }
    else {
      const lastId = lastRequest.requestId;
      const num = lastId.slice(5);
      const newNum = parseInt(num) + 1;
      const newNumString = newNum.toString();
      const requestId = "LRQ-" + newNumString;
    }
    
    const {error, result} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    result.requestStatus = pending;
    
    //create new request 
    
    result.requestId = requestId;
    
    const newLeaveRequest = await new leaveRequestModel(result);
    await newLeaveRequest.save();
    
  } catch(error) {
    return res.status(500).send(error);
  }
}

//_______________________________
//-------------------------------

module.exports.updateLeaveRequest = async (req, res) => {
  try {
    
    const {name, employeeId, department, reason, startDate, resumptionDate} = req.body;
    
    request = await leaveReaquestModel.findById(request-id);
    
    request.name = name ? name : request.name;
    
  } catch(error) {
    return res.status(500).send(error);
  }
  
}

//_______________________________
//-------------------------------

module.exports.manageLeaveRequest = async (req, res) => {
  try {
    const request = leaveRequestModel.findById(req.params.request-id);
    
    request.requestStatus = req.body.status;
    await request.save();
    
    const user = await  userModel.findOne({employeeDetails.employeeId == request.employeeId});
    
    if(req.body.status === "approved") { 
      user.employeeDetails.attendance = "On leave"; 
      await user.save(); 
    return res.status(200).send("requests successfully approve);
    }
    
    return res.status(201).send("request Declined")
  } catch(error) {
    return res.status(500).send(error);
  }
}

//_______________________________
//-------------------------------

module.exports.viewAllLeaveRequests = async (req, res) => {
  try {
    const requests = leaveRequestModel.find();
    return res.status(201).json(request);
  } catch(error) {
    return res.status(500).send(error)
  }
}

//_______________________________
//-------------------------------

module.exports.viewSpecificLeaveRequest = async (req, res) => {
  try {
    
    const request = await leaveRequestModel.findById(req.params.requst-id);
    return res.status(201).json(request);
  } catch(error) {
    return res.status(500).send(error);
  }
}

//_______________________________
//-------------------------------

module.exports.manageTaskCompletionRequest = async (req, res) => {
  try { 
    
    const request = await taskCompletionRequestModel.findOne({taskId === req.body.task-id});
    
    request.status = req.body.status;
    
    if(req.body.status == approved) { 
      const task = await taskmodel.findOne({taskId: req.params.task-id});
      //approve request 
      task.status = "completed";
      task.comment = req.body.comment
      await task.save();
      return res.status(201).send("Request successfully approved"); 
      
    }
    
    //if request is Declined
    sendmail()
    return res.status(201).send("request Declined")
    
  } catch(error) {
    return res.status(500).send(error);
  }
}

//_______________________________
/--------------------------------


module.exports.myRequests = async (req, res) => {
  try {
    
    const myTaskCompletionRequests = await taskCompletionRequestModel.find({employeeId: req.params.employee-id});
    
    const myLeaveRequests = await leaveRequestModel.find({employeeId: req.params.employee-id})
    
    const myRequests = {
      ... myTaskCompletionRequests,
      ... myLeaveRequests
    }
    
    return res.status(201).json(myRequests)
  } catch(error) {
    return res.status(500).send(error)
  }
}