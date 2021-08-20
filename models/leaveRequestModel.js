
const mongoose = require("mongoose")
const {Schema} = mongoose

const leaveRequestModelSchema = new Schema({
    requestedBy: String,
    date: Date,
    reason: String,
    startDate: String,
    resumptionDate: String,
    resumption: String, // reaumed or yet to resume 
    status: String //pending, approved or declined
})



const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestModelSchema);


module.exports = LeaveRequest;