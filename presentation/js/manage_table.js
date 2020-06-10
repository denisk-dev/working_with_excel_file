/**
 * author: Denis kravchenko
 *
 */

function deleteRow(number) {
  let instanceId = document.getElementById("row" + number).className;
  let objectId = {
    id: instanceId,
  };

  ajaxRequestHandlerNoAction(
    "DELETE",
    "http://localhost:3000/students",
    objectId
  );

  document.getElementById("row" + number).outerHTML = "";
}

function addRow() {
  let newRefDate = document.getElementById("newRefDate").value;
  let newGeo = document.getElementById("newGEO").value;
  let newDguid = document.getElementById("newDGUID").value;
  let newSex = document.getElementById("newSEX").value;
  let newAgeGr = document.getElementById("newAgeGr").value;
  let newStudRes = document.getElementById("newStudRes").value;
  let newUom = document.getElementById("newUOM").value;
  let newUomId = document.getElementById("newUOMID").value;
  let newScalFact = document.getElementById("newScalFact").value;
  let newScalId = document.getElementById("newScalID").value;
  let newVect = document.getElementById("newVect").value;
  let newCoor = document.getElementById("newCoor").value;
  let newVal = document.getElementById("newVal").value;
  let newStat = document.getElementById("newStat").value;
  let newSymb = document.getElementById("newSymb").value;
  let newTermin = document.getElementById("newTermin").value;
  let newDecim = document.getElementById("newDecim").value;

  let newInstanceObject = {
    REF_DATE: newRefDate,
    GEO: newGeo,
    DGUID: newDguid,
    SEX: newSex,
    AGE_GROUP: newAgeGr,
    STUDENT_RESPONSE: newStudRes,
    UOM: newUom,
    UOM_ID: newUomId,
    SCALAR_FACTOR: newScalFact,
    SCALAR_ID: newScalId,
    VECTOR: newVect,
    COORDINATE: newCoor,
    VALUE: newVal,
    STATUS: newStat,
    SYMBOL: newSymb,
    TERMINATED: newTermin,
    DECIMALS: newDecim,
  };

  ajaxRequestHandlerNoAction(
    "POST",
    "http://localhost:3000/students",
    newInstanceObject
  );

  let table = document.getElementById("mainDataTable");
  let tableLength = table.rows.length - 1;
  var row = (table.insertRow(tableLength).outerHTML =
    "<tr id='row" +
    tableLength +
    "'><td id='RefDateRow" +
    tableLength +
    "'>" +
    newRefDate +
    "</td><td id='Georow" +
    tableLength +
    "'>" +
    newGeo +
    "</td>" +
    "<td id='Dguidrow" +
    tableLength +
    "'>" +
    newDguid +
    "</td>" +
    "<td id='Sexrow" +
    tableLength +
    "'>" +
    newSex +
    "</td>" +
    "<td id='AgeGrrow" +
    tableLength +
    "'>" +
    newAgeGr +
    "</td>" +
    "<td id='StudResrow" +
    tableLength +
    "'>" +
    newStudRes +
    "</td>" +
    "<td id='Uomrow" +
    tableLength +
    "'>" +
    newUom +
    "</td>" +
    "<td id='UomIdrow" +
    tableLength +
    "'>" +
    newUomId +
    "</td>" +
    "<td id='ScalFactrow" +
    tableLength +
    "'>" +
    newScalFact +
    "</td>" +
    "<td id='ScalIdrow" +
    tableLength +
    "'>" +
    newScalId +
    "</td>" +
    "<td id='Vectrow" +
    tableLength +
    "'>" +
    newVect +
    "</td>" +
    "<td id='Coorrow" +
    tableLength +
    "'>" +
    newCoor +
    "</td>" +
    "<td id='Valrow" +
    tableLength +
    "'>" +
    newVal +
    "</td>" +
    "<td id='Statrow" +
    tableLength +
    "'>" +
    newStat +
    "</td>" +
    "<td id='Symbrow" +
    tableLength +
    "'>" +
    newSymb +
    "</td>" +
    "<td id='Terminrow" +
    tableLength +
    "'>" +
    newTermin +
    "</td>" +
    "<td id='Decimrow" +
    tableLength +
    "'>" +
    newDecim +
    "</td>" +
    "<td><button type='button' id='buttonEdit" +
    tableLength +
    "' class='btn btn-warning' onclick='editRow(" +
    tableLength +
    ")'>Edit</button><button type='button' id='buttonSave" +
    tableLength +
    "' class='save btn btn-success' onclick='saveRow(" +
    tableLength +
    ")'>Save</button><button type='button' class='btn btn-danger' onclick='deleteRow(" +
    tableLength +
    ")'>Delete</button></td> </tr>");

  newRefDate = document.getElementById("newRefDate").value = "";
  newGeo = document.getElementById("newGEO").value = "";
  newDguid = document.getElementById("newDGUID").value = "";
  newSex = document.getElementById("newSEX").value = "";
  newAgeGr = document.getElementById("newAgeGr").value = "";
  newStudRes = document.getElementById("newStudRes").value = "";
  newUom = document.getElementById("newUOM").value = "";
  newUomId = document.getElementById("newUOMID").value = "";
  newScalFact = document.getElementById("newScalFact").value = "";
  newScalId = document.getElementById("newScalID").value = "";
  newVect = document.getElementById("newVect").value = "";
  newCoor = document.getElementById("newCoor").value = "";
  newVal = document.getElementById("newVal").value = "";
  newStat = document.getElementById("newStat").value = "";
  newSymb = document.getElementById("newSymb").value = "";
  newTermin = document.getElementById("newTermin").value = "";
  newDecim = document.getElementById("newDecim").value = "";
}

function ajaxRequestHandlerNoAction(method, address, data) {
  $.ajax({
    type: method,
    url: address,
    data: JSON.stringify(data),
    contentType: "application/json",
    async: false,
    success: function (data) {
      console.log("Done");
    },
  });
}

function ajaxRequestHandler(method, address, handlerData) {
  $.ajax({
    type: method,
    url: address,
    async: false,
    success: function (data) {
      handlerData(data);
    },
  });
}

ajaxRequestHandler(
  "GET",
  "http://localhost:3000/students",
  populateTableWithDataFromDB
);

function reload() {
  location.reload();
  ajaxRequestHandlerNoAction("POST", "http://localhost:3000/students/reload", {
    reload: true,
  });
  ajaxRequestHandler(
    "GET",
    "http://localhost:3000/students",
    populateTableWithDataFromDB
  );
}

function populateTableWithDataFromDB(data) {
  for (let i = 0; i < data.length; i++) {
    let table = document.getElementById("mainDataTable");
    let tableLength = table.rows.length - 1;
    var row = (table.insertRow(tableLength).outerHTML =
      "<tr id='row" +
      tableLength +
      "' class ='" +
      data[i]._id +
      "'><td id='RefDateRow" +
      tableLength +
      "'>" +
      data[i].REF_DATE +
      "</td><td id='Georow" +
      tableLength +
      "'>" +
      data[i].GEO +
      "</td>" +
      "<td id='Dguidrow" +
      tableLength +
      "'>" +
      data[i].DGUID +
      "</td>" +
      "<td id='Sexrow" +
      tableLength +
      "'>" +
      data[i].SEX +
      "</td>" +
      "<td id='AgeGrrow" +
      tableLength +
      "'>" +
      data[i].AGE_GROUP +
      "</td>" +
      "<td id='StudResrow" +
      tableLength +
      "'>" +
      data[i].STUDENT_RESPONSE +
      "</td>" +
      "<td id='Uomrow" +
      tableLength +
      "'>" +
      data[i].UOM +
      "</td>" +
      "<td id='UomIdrow" +
      tableLength +
      "'>" +
      data[i].UOM_ID +
      "</td>" +
      "<td id='ScalFactrow" +
      tableLength +
      "'>" +
      data[i].SCALAR_FACTOR +
      "</td>" +
      "<td id='ScalIdrow" +
      tableLength +
      "'>" +
      data[i].SCALAR_ID +
      "</td>" +
      "<td id='Vectrow" +
      tableLength +
      "'>" +
      data[i].VECTOR +
      "</td>" +
      "<td id='Coorrow" +
      tableLength +
      "'>" +
      data[i].COORDINATE +
      "</td>" +
      "<td id='Valrow" +
      tableLength +
      "'>" +
      data[i].VALUE +
      "</td>" +
      "<td id='Statrow" +
      tableLength +
      "'>" +
      data[i].STATUS +
      "</td>" +
      "<td id='Symbrow" +
      tableLength +
      "'>" +
      data[i].SYMBOL +
      "</td>" +
      "<td id='Terminrow" +
      tableLength +
      "'>" +
      data[i].TERMINATED +
      "</td>" +
      "<td id='Decimrow" +
      tableLength +
      "'>" +
      data[i].DECIMALS +
      "</td>" +
      "<td><button type='button' id='buttonEdit" +
      tableLength +
      "' class='btn btn-warning' onclick='editRow(" +
      tableLength +
      ")'>Edit</button><button type='button' id='buttonSave" +
      tableLength +
      "' class='save btn btn-success' onclick='saveRow(" +
      tableLength +
      ")'>Save</button><button type='button' class='btn btn-danger' onclick='deleteRow(" +
      tableLength +
      ")'>Delete</button></td> </tr>");
  }
}

function editRow(number) {
  console.log("here " + number);
  document.getElementById("buttonEdit" + number).style.display = "none";
  document.getElementById("buttonSave" + number).style.display = "block";

  let editRefDate = document.getElementById("RefDateRow" + number);
  let editGeo = document.getElementById("Georow" + number);
  let editDguid = document.getElementById("Dguidrow" + number);
  let editSex = document.getElementById("Sexrow" + number);
  let editAgeGr = document.getElementById("AgeGrrow" + number);
  let editStudRes = document.getElementById("StudResrow" + number);
  let editUom = document.getElementById("Uomrow" + number);
  let editUomId = document.getElementById("UomIdrow" + number);
  let editScalFact = document.getElementById("ScalFactrow" + number);
  let editScalId = document.getElementById("ScalIdrow" + number);
  let editVect = document.getElementById("Vectrow" + number);
  let editCoor = document.getElementById("Coorrow" + number);
  let editVal = document.getElementById("Valrow" + number);
  let editStat = document.getElementById("Statrow" + number);
  let editSymb = document.getElementById("Symbrow" + number);
  let editTermin = document.getElementById("Terminrow" + number);
  let editDecim = document.getElementById("Decimrow" + number);

  let RefDate = editRefDate.innerHTML;
  let Geo = editGeo.innerHTML;
  let Dguid = editDguid.innerHTML;
  let Sex = editSex.innerHTML;
  let AgeGr = editAgeGr.innerHTML;
  let StudRes = editStudRes.innerHTML;
  let Uom = editUom.innerHTML;
  let UomId = editUomId.innerHTML;
  let ScalFact = editScalFact.innerHTML;
  let ScalId = editScalId.innerHTML;
  let Vect = editVect.innerHTML;
  let Coor = editCoor.innerHTML;
  let Val = editVal.innerHTML;
  let Stat = editStat.innerHTML;
  let Symb = editSymb.innerHTML;
  let Termin = editTermin.innerHTML;
  let Decim = editDecim.innerHTML;

  editRefDate.innerHTML =
    "<input type='text' size='1' id='editedRefDate" +
    number +
    "' value='" +
    RefDate +
    "'>";
  editGeo.innerHTML =
    "<input type='text' size='1' id='editedGeo" +
    number +
    "' value='" +
    Geo +
    "'>";
  editDguid.innerHTML =
    "<input type='text' size='1' id='editedDguid" +
    number +
    "' value='" +
    Dguid +
    "'>";
  editSex.innerHTML =
    "<input type='text' size='1' id='editedSex" +
    number +
    "' value='" +
    Sex +
    "'>";
  editAgeGr.innerHTML =
    "<input type='text' size='1' id='editedAgeGr" +
    number +
    "' value='" +
    AgeGr +
    "'>";
  editStudRes.innerHTML =
    "<input type='text' size='1' id='editedStudRes" +
    number +
    "' value='" +
    StudRes +
    "'>";
  editUom.innerHTML =
    "<input type='text' size='1' id='editedUom" +
    number +
    "' value='" +
    Uom +
    "'>";
  editUomId.innerHTML =
    "<input type='text' size='1' id='editedUomId" +
    number +
    "' value='" +
    UomId +
    "'>";
  editScalFact.innerHTML =
    "<input type='text' size='1' id='editedScalFact" +
    number +
    "' value='" +
    ScalFact +
    "'>";
  editScalId.innerHTML =
    "<input type='text' size='1' id='editedScalId" +
    number +
    "' value='" +
    ScalId +
    "'>";
  editVect.innerHTML =
    "<input type='text' size='1' id='editedVect" +
    number +
    "' value='" +
    Vect +
    "'>";
  editCoor.innerHTML =
    "<input type='text' size='1' id='editedCoor" +
    number +
    "' value='" +
    Coor +
    "'>";
  editVal.innerHTML =
    "<input type='text' size='1' id='editedVal" +
    number +
    "' value='" +
    Val +
    "'>";
  editStat.innerHTML =
    "<input type='text' size='1' id='editedStat" +
    number +
    "' value='" +
    Stat +
    "'>";
  editSymb.innerHTML =
    "<input type='text' size='1' id='editedSymb" +
    number +
    "' value='" +
    Symb +
    "'>";
  editTermin.innerHTML =
    "<input type='text' size='1' id='editedTermin" +
    number +
    "' value='" +
    Termin +
    "'>";
  editDecim.innerHTML =
    "<input type='text' size='1' id='editedDecim" +
    number +
    "' value='" +
    Decim +
    "'>";
}

function saveRow(number) {
  let RefDate = document.getElementById("editedRefDate" + number).value;
  let Geo = document.getElementById("editedGeo" + number).value;
  let Dguid = document.getElementById("editedDguid" + number).value;
  let Sex = document.getElementById("editedSex" + number).value;
  let AgeGr = document.getElementById("editedAgeGr" + number).value;
  let StudRes = document.getElementById("editedStudRes" + number).value;
  let Uom = document.getElementById("editedUom" + number).value;
  let UomId = document.getElementById("editedUomId" + number).value;
  let ScalFact = document.getElementById("editedScalFact" + number).value;
  let ScalId = document.getElementById("editedScalId" + number).value;
  let Vect = document.getElementById("editedVect" + number).value;
  let Coor = document.getElementById("editedCoor" + number).value;
  let Val = document.getElementById("editedVal" + number).value;
  let Stat = document.getElementById("editedStat" + number).value;
  let Symb = document.getElementById("editedSymb" + number).value;
  let Termin = document.getElementById("editedTermin" + number).value;
  let Decim = document.getElementById("editedDecim" + number).value;

  let instanceId = document.getElementById("row" + number).className;

  let newInstanceObject = {
    REF_DATE: RefDate,
    GEO: Geo,
    DGUID: Dguid,
    SEX: Sex,
    AGE_GROUP: AgeGr,
    STUDENT_RESPONSE: StudRes,
    UOM: Uom,
    UOM_ID: UomId,
    SCALAR_FACTOR: ScalFact,
    SCALAR_ID: ScalId,
    VECTOR: Vect,
    COORDINATE: Coor,
    VALUE: Val,
    STATUS: Stat,
    SYMBOL: Symb,
    TERMINATED: Termin,
    DECIMALS: Decim,
    _id: instanceId,
  };

  ajaxRequestHandlerNoAction(
    "PATCH",
    "http://localhost:3000/students",
    newInstanceObject
  );

  document.getElementById("RefDateRow" + number).innerHTML = RefDate;
  document.getElementById("Georow" + number).innerHTML = Geo;
  document.getElementById("Dguidrow" + number).innerHTML = Dguid;
  document.getElementById("Sexrow" + number).innerHTML = Sex;
  document.getElementById("AgeGrrow" + number).innerHTML = AgeGr;
  document.getElementById("StudResrow" + number).innerHTML = StudRes;
  document.getElementById("Uomrow" + number).innerHTML = Uom;
  document.getElementById("UomIdrow" + number).innerHTML = UomId;
  document.getElementById("ScalFactrow" + number).innerHTML = ScalFact;
  document.getElementById("ScalIdrow" + number).innerHTML = ScalId;
  document.getElementById("Vectrow" + number).innerHTML = Vect;
  document.getElementById("Coorrow" + number).innerHTML = Coor;
  document.getElementById("Valrow" + number).innerHTML = Val;
  document.getElementById("Statrow" + number).innerHTML = Stat;
  document.getElementById("Symbrow" + number).innerHTML = Symb;
  document.getElementById("Terminrow" + number).innerHTML = Termin;
  document.getElementById("Decimrow" + number).innerHTML = Decim;

  document.getElementById("buttonEdit" + number).style.display = "block";
  document.getElementById("buttonSave" + number).style.display = "none";
}

function downloadData() {
  let newFileName = document.getElementById("fileNameDownload").value;
  if (newFileName === "") {
    newFileName = null;
  }

  let allDataObject = [];

  let table = document.getElementById("mainDataTable");
  let tableLength = table.rows.length - 1;
  for (let i = 1; i < tableLength; i++) {
    allDataObject.push({
      RefDate: document.getElementById("RefDateRow" + i).innerHTML,
      Geo: document.getElementById("Georow" + i).innerHTML,
      Dguid: document.getElementById("Dguidrow" + i).innerHTML,
      Sex: document.getElementById("Sexrow" + i).innerHTML,
      AgeGr: document.getElementById("AgeGrrow" + i).innerHTML,
      StudRes: document.getElementById("StudResrow" + i).innerHTML,
      Uom: document.getElementById("Uomrow" + i).innerHTML,
      UomId: document.getElementById("UomIdrow" + i).innerHTML,
      ScalFact: document.getElementById("ScalFactrow" + i).innerHTML,
      ScalId: document.getElementById("ScalIdrow" + i).innerHTML,
      Vect: document.getElementById("Vectrow" + i).innerHTML,
      Coor: document.getElementById("Coorrow" + i).innerHTML,
      Val: document.getElementById("Valrow" + i).innerHTML,
      Stat: document.getElementById("Statrow" + i).innerHTML,
      Symb: document.getElementById("Symbrow" + i).innerHTML,
      Termin: document.getElementById("Terminrow" + i).innerHTML,
      Decim: document.getElementById("Decimrow" + i).innerHTML,
    });
  }
  allDataObject.push({ newFileName: newFileName });

  ajaxRequestHandlerNoAction(
    "POST",
    "http://localhost:3000/students/download",
    allDataObject
  );
  document.getElementById("fileNameDownload").value = "";
}
