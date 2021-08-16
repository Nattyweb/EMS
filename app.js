
const express = require("express");
const dotenv = require("dotenv");
const app = exprees();


const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const db = require('./config/db');

// configure dotenv for environment variable
dotenv.config({ path: "./config.env" });

//connect database
db();

//body-parsers
app.use(express.json());
app.use(express.urlencoded({extended: false})):

//mounting
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/task", taskRoutes)

const port = process.env.PORT
app.listen(port, () => console.log("server running"));