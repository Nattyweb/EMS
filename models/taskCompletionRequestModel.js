
const express = require("express");
const mongoose = require("mongoose");

const {schema} = mongoose.schema();

taskCompletionRequestSchema = new schema({
  name: String,
  taskId: String,
  status: String, //pending, approved or declined
  comment: String
})

const taskCompletionRequest = mongoose.model("Task Completion Request", taskCompletionRequestSchema);

module.exports = taskCompletionRequest;