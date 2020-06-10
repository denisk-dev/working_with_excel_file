/**
 * author: Denis kravchenko
 */

/**
 * module to get connection with a file to input/output to a file
 * @type{object}
 */
let fs = require("fs");

/**
 * inherits class from student file
 * @type{object}
 */
let studentObject = require("../model/StudentRecord.js");

//First row from the csv dataset
let csvHeaders;

/**
 * method do get data from csv file and return
 * @param{string} the name of the csv file
 * @return{studentsDataUpdated} the data for the application
 */
function readStudentsData(fileName) {
  let studentsData = [];
  let fileContents;
  let studentsDataUpdated = [];
  try {
    fileContents = fs.readFileSync(fileName);
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      studentsData.push(lines[i].toString().split(","));
    }
    csvHeaders = studentsData[0];
    for (let k = 1; k < studentsData.length; k++) {
      studentsDataUpdated.push(
        new studentObject(
          studentsData[k][0].slice(1, -1),
          studentsData[k][1].slice(1, -1),
          studentsData[k][2].slice(1, -1),
          studentsData[k][3].slice(1, -1),
          studentsData[k][4].slice(1, -1),
          studentsData[k][5].slice(1, -1),
          studentsData[k][6].slice(1, -1),
          studentsData[k][7].slice(1, -1),
          studentsData[k][8].slice(1, -1),
          studentsData[k][9].slice(1, -1),
          studentsData[k][10].slice(1, -1),
          studentsData[k][11].slice(1, -1),
          studentsData[k][12].slice(1, -1),
          studentsData[k][13].slice(1, -1),
          studentsData[k][14].slice(1, -1),
          studentsData[k][15].slice(1, -1),
          studentsData[k][16].slice(1, -1)
        )
      );
    }

    return studentsDataUpdated;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("File not found!");
    } else {
      console.log(err);
    }
  }
}

/**
 * method to create csv file and write data to this file
 * @param{object} array of the data to write to file
 */
function writeToCSVFile(data) {
  let dataToPersist = "";
  dataToPersist += csvHeaders.toString() + "\n";

  for (let i = 0; i < data.length - 1; i++) {
    dataToPersist += '"' + data[i].RefDate + '"' + ",";
    dataToPersist += '"' + data[i].Geo + '"' + ",";
    dataToPersist += '"' + data[i].Dguid + '"' + ",";
    dataToPersist += '"' + data[i].Sex + '"' + ",";
    dataToPersist += '"' + data[i].AgeGr + '"' + ",";
    dataToPersist += '"' + data[i].StudRes + '"' + ",";
    dataToPersist += '"' + data[i].Uom + '"' + ",";
    dataToPersist += '"' + data[i].UomId + '"' + ",";
    dataToPersist += '"' + data[i].ScalFact + '"' + ",";
    dataToPersist += '"' + data[i].ScalId + '"' + ",";
    dataToPersist += '"' + data[i].Vect + '"' + ",";
    dataToPersist += '"' + data[i].Coor + '"' + ",";
    dataToPersist += '"' + data[i].Val + '"' + ",";
    dataToPersist += '"' + data[i].Stat + '"' + ",";
    dataToPersist += '"' + data[i].Symb + '"' + ",";
    dataToPersist += '"' + data[i].Termin + '"' + ",";

    if (i == data.length - 2) dataToPersist += '"' + data[i].Decim + '"';
    else dataToPersist += '"' + data[i].Decim + '"' + "\n";
  }

  let nameFile =
    data[data.length - 1].newFileName == null
      ? "./13100262-eng/13100262.csv"
      : "./NewCSV/" + data[data.length - 1].newFileName + ".csv";

  fs.writeFileSync(nameFile, dataToPersist);
}

//exporting the method to read student's data
exports.readStudentsData = readStudentsData;
//exporting the method writeToCSVFile
exports.writeToCSVFile = writeToCSVFile;
