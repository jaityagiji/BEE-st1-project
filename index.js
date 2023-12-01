const express = require("express");
const { connectToDb } = require("./middleware/db");
const app = express();

const Router = require('./Router/Routes');


connectToDb();
app.use(express.json());

app.use("", Router);

app.use((req,res,next) => {
    res.status(404).send("Yeh koi tarika hai galat url bharne ka");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
