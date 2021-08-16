const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    bio: {
      firstName: String,
      lastName: String,
      maritalStatus: String,
      nextOfKin: String,
      Nationality: String,
      religion: String,
      dateOfBirth: Date,
    }
    contactDetails: {
      phone: String,
      email: String,
      address: String
    }
    employmentDetails: {
      department: String,
      employeeId: String,
      dateEmployed: String,
      category: String, // admin or employee
      attendance: String //present, absent or on leave
    }
    education: {
      qualification: String,
      school: String,
    }
    paymentDetails: {
      bank: String,
      accountNumber: String,
      accountType: String
    }
    signinDetails: {
      email: String,
      password: String
    }
  });



const Users = mongoose.model("Users", userSchema);


module.exports = Users;