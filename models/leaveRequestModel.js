
const mongoose = require("mongoose")
const {Schema} = mongoose

const leaveRequestModelSchema = new Schema({
    requestedBy: String,
    date: Date,
    reason: String,
    startDate: String,
    resumptionDate: String
})



const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestModelSchema);


module.exports = LeaveRequest;