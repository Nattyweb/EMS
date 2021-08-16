const mongoose = require("mongoose")
const {Schema} = mongoose

const taskSchema = new Schema({
    taskId: String,
    name: String,
    description: String,
    startDate: String,
    completionDate: String,
    assignedTo: {
      one: {
        name: String,
        employeeId: String
      }
      two: {
        name: String,
        employeeId: String 
      }
      three: {
        name: String,
        employeeId: String
      }
    }
    status: String //completed, ongoing or on hold
  });



const Tasks = mongoose.model("Tasks", taskSchema);


module.exports = Tasks;