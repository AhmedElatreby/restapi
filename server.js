require("dotenv").config();

const express = require("express");
const studentRoute = require("./src/student/routes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/students", studentRoute);
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
