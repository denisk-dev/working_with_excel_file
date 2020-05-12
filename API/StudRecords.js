/** 
* author: Dennis kravchenko
* class: CST 8333 
* Algonquin College
* 2020-03-24
*/

/**
 * Node.js framework
 * @type{object}
 */
const express = require('express');
/**
 * Router for the routes of web application
 * @type{object}
 */
const router = express.Router();
/**
 * bodyParse is transforming data into different formats
 * @type{object}
 */
const bodyParser = require('body-parser');

/**
 * Getting the Schema
 * @type{object}
 */
const StudentRecord = require('../db/Student.js');

/**
 * MongoDB object modeling tool. Helps to communicate with the db
 * @type{object}
 */
const mongoose = require('mongoose');
/**
 * Getting methods to read and write to mongo db
 * @type{object}
 */
let persist = require('../persistence/RecordStore.js');

//making sure we get json data
router.use(bodyParser.json())

//when user accesses /reload URL the user gets data from 
router.post('/reload', (req,res,next) =>{

if(req.body.reload == true){
  let data = persist.readStudentsData('13100262-eng/13100262.csv');

  mongoose.connection.collections['studentsrecords'].drop(function(err) {
    console.log("Collection is empty!");
  });

  //Loading the data into the mongo db
for(let i=0; i<data.length; i++){
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
    DECIMALS: data[i].decimals
  });
  
  record.save();
  }

}
  res.json({
    message : 'Success'
  }); 
});

//when user accesses /download URL the user gets downloaded csv file
router.post('/download', (req,res, next) => {
  
  persist.writeToCSVFile(req.body);
  //console.log(req.body);
 res.json({message : "Success"});

});

//when user accesses / URL the user gets the web app in his browser
router.get('/', async (req,res,next) =>{
  // const posts = Post.find();
  // res.json(posts);
  try{
    const posts = await StudentRecord.find();
    res.json(posts);

  }catch(err){
    res.json({message: err});
  }
});
//when user accesses / URL with delete method, some row gets deleted from table
router.delete('/', async (req, res, next) =>{

  try{
    const removedPost = await StudentRecord.deleteOne({_id : req.body.id});
    res.json(removedPost);
  } catch(err){
    res.json({message : err});
  }
  

  //res.json({message : "suckass"});
});
//when user accesses / URL with patch method, the row gets updated
router.patch('/', async (req,res,next) =>{

  //console.log(req.body);
  let updatedObj = req.body;
  try{
    const updatePost = await StudentRecord.updateOne({_id : req.body._id}, 
      {$set :
        {
          REF_DATE: updatedObj.REF_DATE,
          GEO: updatedObj.GEO,
          DGUID: updatedObj.DGUID,
          SEX: updatedObj.SEX,
          AGE_GROUP: updatedObj.AGE_GROUP,
          STUDENT_RESPONSE: updatedObj.STUDENT_RESPONSE,
          UOM: updatedObj.UOM,
          UOM_ID: updatedObj.UOM_ID,
          SCALAR_FACTOR: updatedObj.SCALAR_FACTOR,
          SCALAR_ID: updatedObj.SCALAR_ID,
          VECTOR: updatedObj.VECTOR,
          COORDINATE: updatedObj.COORDINATE,
          VALUE: updatedObj.VALUE,
          STATUS: updatedObj.STATUS,
          SYMBOL: updatedObj.SYMBOL,
          TERMINATED: updatedObj.TERMINATED,
          DECIMALS: updatedObj.DECIMALS
      
        }});
    res.json(updatePost);
  } catch(err){
    res.json({message : err});
  }

  
  //res.json({message : "test"});
});
//when user accesses / URL with post method, the row gets added
router.post('/', (req,res,next) =>{

  let editInstance = req.body;
  

  const record = new StudentRecord({
    REF_DATE: editInstance.REF_DATE,
    GEO: editInstance.GEO,
    DGUID: editInstance.DGUID,
    SEX: editInstance.SEX,
    AGE_GROUP: editInstance.AGE_GROUP,
    STUDENT_RESPONSE: editInstance.STUDENT_RESPONSE,
    UOM: editInstance.UOM,
    UOM_ID: editInstance.UOM_ID,
    SCALAR_FACTOR: editInstance.SCALAR_FACTOR,
    SCALAR_ID: editInstance.SCALAR_ID,
    VECTOR: editInstance.VECTOR,
    COORDINATE: editInstance.COORDINATE,
    VALUE: editInstance.VALUE,
    STATUS: editInstance.STATUS,
    SYMBOL: editInstance.SYMBOL,
    TERMINATED: editInstance.TERMINATED,
    DECIMALS: editInstance.DECIMALS
  });

  record.save();
 
  
  res.json({message : "Success"});
  
});

//exporting the routes
module.exports = router;
