const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");

//Handle cors
app.use(cors());

app.use(express.json());

//Route Imports
const posts = require("./routes/postRoute");
const newUser = require("./routes/userRoute");

app.use("/api/v1", posts);
app.use("/api/v1", newUser);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
