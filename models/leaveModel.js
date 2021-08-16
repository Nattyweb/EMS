const mongoose = require("mongoose")
const {Schema} = mongoose

const leaveSchema = new Schema({
    requestedBy: {
      name: String,
      employeeId: String
    }
    duration: String,
    startDate: String,
    resumptionDate: String,
    status: String,
    approvedBy: String
  });



const Leave = mongoose.model("Leave", leaveSchema);


module.exports = Leave;