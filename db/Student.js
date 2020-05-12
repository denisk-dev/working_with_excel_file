/** 
* author: Dennis kravchenko
* class: CST 8333 
* Algonquin College
* 2020-03-24
*/

/**
 * MongoDB object modeling tool. Helps to communicate with the db
 * @type{object}
 */
const mongoose = require('mongoose');


/**
 * Schema for the database
 */
const StudentsSchema = mongoose.Schema({

  REF_DATE:{
    type: String
  },
  GEO:{
    type: String
  },
  DGUID:{
    type: String
  },
  SEX:{
    type: String
  },
  AGE_GROUP:{
    type: String
  },
  STUDENT_RESPONSE:{
    type: String
  },
  UOM:{
    type: String
  },
  UOM_ID:{
    type: String
  },
  SCALAR_FACTOR:{
    type: String
  },
  SCALAR_ID:{
    type: String
  },
  VECTOR:{
    type: String
  },
  COORDINATE:{
    type: String
  },
  VALUE:{
    type: String
  },
  STATUS:{
    type: String
  },
  SYMBOL:{
    type: String
  },
  TERMINATED:{
    type: String
  },
  DECIMALS:{
    type: String
  }
});


//exporting the Schema
module.exports = mongoose.model('StudentsRecords', StudentsSchema);