
const express = require("express");
const dotenv = require("dotenv");
const app = exprees();


const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const requestRoutes = require("./routes/requestRoutes");
const db = require('./db');

// configure dotenv for environment variable
dotenv.config({ path: "./.env" });

//connect database
db();

//body-parsers
app.use(express.json());
app.use(express.urlencoded({extended: false})):

//mounting
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/task", taskRoutes)
app.use("/api/v1/request", request Routes)

const port = process.env.PORT
app.listen(port, () => console.log("server running"));