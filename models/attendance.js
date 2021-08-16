
const mongoose = require("mongoose")
const {Schema} = mongoose

const attendanceSchema = new Schema({
    date: String,
    timeIn: String,
    timeOut: String,
    employeeId: String,
    firstName: String
  });



const Attendance = mongoose.model("Attendance", attendanceSchema);


module.exports = Leave;