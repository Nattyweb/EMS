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
module.exports.signin = async (req, res, next) => {
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
    
    
    if(user.account.status == admin) {
      const numberPresent = await userModel.find({user.attendance.status == present}).length;
      const numberAbsent = await userModel.find({user.attendance.status == absent}).length;
      const numberOnLeave = await userModel.find({user.attendance.status == onLeave}).length;
      const totalEmployees = await userModel.find().length;
      return res.status(201).json({welcomeMessage, numberPresent, numberAbsent, numberOnLeave, totalEmployees, token});
    }
    
    if(user.account.status == employee) {
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
    const {firstName, lastName, employeeId, password} = req.body;
    
    //hash password
    const passwordHash = bcrypt.hash(password, 10)
    
    let newEmployee = {
      bio.firstName: firstName,
      bio.lastName: lastName,
      employeeDetails.EmployeeId: EmployeeId,
      accountDetails.password: passwordHash
    }
    
    //add user 
    const employee = await new userModel(newEmployee);
    await employee.save();
    
    sendRegistrationMail();
    return res.status(201).send("registration successful");
    
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