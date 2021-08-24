
const mongoose = require("mongoose")
const {Schema} = mongoose.schema()

const attendanceSchema = new Schema({
    date: Date,
    timeIn: String,
    timeOut: String,
    employeeId: String,
    firstName: String,
    lastName: String
  });



const Attendance = mongoose.model("Attendance", attendanceSchema);


module.exports = Attendance;