/**
 * author: Denis kravchenko
 */

/**
 * importing the write csv + read csv methods from RecordStore.js
 * @type{object}
 */
let currentStudentRecords = require("../persistence/RecordStore.js");

/**
 * MongoDB object modeling tool. Helps to communicate with the db
 * @type{object}
 */
const mongoose = require("mongoose");

/**
 * Getting the data from 13100262.csv file
 */
let data = currentStudentRecords.readStudentsData("13100262-eng/13100262.csv");

/**
 * Getting the Schema for mongo db
 */
const StudentRecord = require("../db/Student.js");

//connecting to mongo db
mongoose.connect(
  "mongodb+srv://dennis:denis14@cluster0-0b6om.mongodb.net/students?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected to mongodb");
  }
);

//Clear the collection before use
mongoose.connection.collections["studentsrecords"].drop(function (err) {
  console.log("Collection is empty!");
});

//Loading the data into the mongo db when we start web application
for (let i = 0; i < data.length; i++) {
  const record = new StudentRecord({
    REF_DATE: data[i].refDate,
    GEO: data[i].geo,
    DGUID: data[i].dguid,
    SEX: data[i].sex,
    AGE_GROUP: data[i].ageGroup,
    STUDENT_RESPONSE: data[i].studentResponse,
    UOM: data[i].uom,
    UOM_ID: data[i].uomId,
    SCALAR_FACTOR: data[i].scalarFactor,
    SCALAR_ID: data[i].scalarId,
    VECTOR: data[i].vector,
    COORDINATE: data[i].coordinate,
    VALUE: data[i].value,
    STATUS: data[i].status,
    SYMBOL: data[i].symbol,
    TERMINATED: data[i].terminated,
    DECIMALS: data[i].decimals,
  });

  record.save();
}

/**
 * importing the express framework
 * @type{object}
 */
const express = require("express");
/**
 * Getting the app object from express.js
 * @type{object}
 */
const app = express();

//Port 3000 to access the server
const port = 3000;

//getting the routes for REST API
const routes = require("../API/StudRecords.js");

//Fixing the CORS problem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//using 'students' url for routes
app.use("/students", routes);
// making the app listen to port 3000
app.listen(port);
