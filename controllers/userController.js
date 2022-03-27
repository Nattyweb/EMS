// ...
const bcrypt = require("bcryptjs")
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//_________________________________________
//_________________________________________

//sign in
module.exports.signin = async (req, res,) => {
  try {
    const {email, password} = req.body;
    
    //check if user exist im database
    user = await userModel.findOne({email});
    if(!user) return res.send("No account found")
    
    //if user exist, check if password is correct
    const validPassword = await bcrypt.compare(password, user.accountDetails.password);
    if(!validPassword) return res.send("invalid password")
    //if password is valid, generate a token
    const id = user._id
    const token =  jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '2h'
      
    })
    
    const firstName = user.bio.firstName;
    const lastName = user.bio.lastName;
    const welcomeMessage = `Welcome ${firstName, lastName}`;
    
    const pendingTasksCompletionRequest = await taskCompletionModel.find({status: pending});
    const pendingleaveRequest = await leaveRequestModel.find({status: pending});
    
    //concat the two pending requests
    const pendingRequest = { 
      ... pendingleaveRequest, 
      ... pendingTasksCompletionRequest 
    }
    
    
    if(user.account.status === admin) { 
      
      const users = userModel.find();
      const numberPresent = users.filter(user => user.attendance.status === "present").length;
      const numberAbsent = users.filter(user.attendance.status === "absent").length;
      const numberOnLeave = users.filter(user.attendance.status === "onLeave").length;
      const totalEmployees = users.length;
      
      return res.status(201).json({welcomeMessage, numberPresent, numberAbsent, numberOnLeave, totalEmployees, pendingRequest, token});
    }
    
    if(user.account.status === employee) {
      const userBio = user.bio;
      const userContacts = user.Contacts;
      const userPaymentDetails = user.paymentDetails;
      const profile = {userBio, userContacts, userPaymentDetails};
      
      return res.status(201).json({welcomeMessage, profile, token});
    }
    } catch (error) {
      return res.status(500).json(error);
    
  }
}

//____________________________________
//____________________________________

module.exports.addEmployee = async (req, res) => {
  try { 
    
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.String().required(), 
      email: Joi.string().required(),
      password: Joi.String().rquired()
    });
    
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const {firstName, lastName, email, password} = req.body;
    
    //hash password
    const passwordHash = bcrypt.hash(password, 10)
    
    const lastDoc = userModel.find().sort({_id: -1});
    
    if(!lastDoc) {
      const employeeId = "GT-00001";
    }
    else {
      const lastId = lastDoc.employeeDetails.employeeId;
      const num = lastId.slice(4);
      const newNum = parseInt(num) + 1;
      const newNumString = newNum.toString();
      const employeeId = "GT-" + newNumString; 
    }


    let newEmployee = {
      bio: { 
        firstName: firstName,
        lastName: lastName 
      },
      contacts: { 
        email: email 
      },
      employeeDetails: { 
        employeeId: employeeId 
      },
      accountDetails: { password: passwordHash}
    }
    
    //add user 
    const employee = await new userModel(newEmployee);
    await employee.save();
    
    let receiver = email;
    const subject =  "EMPLOYEE ACCOUNT CREATION";
    const message = `An account has been created for you with the following login details: email: ${email}, password: ${password}. Login to update your details`;
    
    
    
    await sendMail(receiver, subject, message);
    return res.status(201).send("Employee added successfully");
    
  } catch(error) {
    return res.status(500).send(error);
  }
}

//____________________________________
//____________________________________

module.exports.updateUser = (req, res) => {
  
  const user = await userModel.findById(req.user._id)
  
  let data = req.body;
  
  user.bio.firstName = data.firstName ? data.firstName : user.bio.firstName;   
  user.bio.lastName = data.lastName ? data.lastName : user.bio.lastName; 
  user.bio.nextOfKin = data.nextOfKin ? data.nextOfKin : user.bio.nextOfKin; 
  user.bio.maritalStatus = data.maritalStatus ? data.firstName : user.bio.maritalStatus; 
  user.bio.nationality = data.nationality ? data.nationality : user.bio.nationality; 
  user.bio.religion = data.religion ? data.religion : user.bio.religion; 
  user.contact.phone = data.phone ? data.phone : user.bio.phone; 
  user.bio.address = data.address ? data.address : user.bio.address;
 
 await user.save();
}

//____________________________________
//------------------------------------

module.exports.changePassword = async (req, res) => {
  try {
    
    const {newPassword, confirmNewPassword } = req.body;
    
    if(!newPassword || !confirmNewPassword || password != confirmNewPassword) {
      return res.status(400).send("error: password and confirm password did not match")
    };
    
    //hash new passwordHash 
    newPasswordHash = bcrypt.hash(newPassword, 10),
    let user = await userModel.findById({_id: req.user._id});
    
    user.accountDetails.password = newPasswordHash
    
    await user.save();
    return res.status(201).send("password successfully changed")
    
  } catch(error) {
    return res.status(500).send(error);
  }
}

//____________________________________
//------------------------------------

module.exports.attendance = async (req, res) => {
  try {
    
    if(!req.body.biometricCode) return res.status(400).send("fingerprint not scanned. Try again");
    
    const user = userModel.findOne({bio:{biometricCode: req.body.biometricCode}});
    
    if(!user) return res.send("user not found");
    
    const attendance = {
      firstName: user.bio.firstName,
      lastName: user.bio.lastName,
      employeeId: user.employeeDetails.employeeId;
      date: Date.now,
      timeIn: date.now
    }
    
    user.employeeDetails.attendance = present;

    
    const signAttendance = await new attendanceModel(attendance);
    await signAttendance.save();
    
    
  } catch(error) {
    return res.status(500).send(error);
  }
}