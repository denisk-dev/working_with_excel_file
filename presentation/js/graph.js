/** 
* author: Dennis kravchenko
* class: CST 8333 
* Algonquin College
* 2020-03-24
*/

/** 
 * This function is toggle between table view and graph view
 * @param{object} element is the object that is responsible for toggle button
*/
function toggleBetweenTableAndGraph(element) {

  if (element.checked) {
    if (document.getElementsByTagName('svg')[0]) {
      document.getElementsByTagName('svg')[0].remove();
    }
    document.getElementById('tableMain').style.display = 'block';
    $('.selectGraph').remove();
  } else {
    document.getElementById('tableMain').style.display = 'none';
    addGraph();
  }
}

/** 
 * This function adds graph to the Graph View using D3.js library
*/
function addGraph() {

  let selectedData = [];

  document.getElementsByTagName('footer')[0].style.display = 'none';

  //Add option to select
  $('body').append('<div class="selectGraph"><p class="selectTxt1">Select Gender</p><select class="form-control" id="selectGender"><option value="Females">Females</option><option value="males">Males</option></select><p class="selectTxt2">Select Age</p><select class="form-control" id="selectAge"><option value="11 years">11 years</option><option value="13 years">13 years</option><option value="15 years">15 years</option></select><button type="button" id="displayBut" class="btn btn-dark">Display</button></div>');

  let genderSelector = document.getElementById('selectGender').value;

  let ageSelector = document.getElementById('selectAge').value;

  //Create Graph when we click a button
  $('#displayBut').click(function () {

    selectedData = [];
    genderSelector = document.getElementById('selectGender').value;
    ageSelector = document.getElementById('selectAge').value;

    if (document.getElementsByTagName('svg')[0]) {
      document.getElementsByTagName('svg')[0].remove();
    }
    let table = document.getElementById('mainDataTable');
    let tableLength = table.rows.length - 1;

    let oftenRes = 0;
    let alwaysRes = 0;
    let sometimesRes = 0;
    let rarelyOrNeverRes = 0;
    let doNotRide = 0;

    for (let i = 1; i < tableLength; i++) {
      let age = document.getElementById('AgeGrrow' + i).innerHTML;
      let gender = document.getElementById('Sexrow' + i).innerHTML;
      let response = document.getElementById('StudResrow' + i).innerHTML;
      if (age == ageSelector && gender == genderSelector) {

        switch (response) {
          case 'Often':
            oftenRes++;
            break;
          case 'Sometimes':
            sometimesRes++;
            break;
          case 'Always':
            alwaysRes++;
            break;
          case 'Rarely or never':
            rarelyOrNeverRes++;
            break;
          case 'Do not ride a bicycle':
            doNotRide++;
            break;
        }
      }
    }

    let totalResponses = oftenRes + sometimesRes + alwaysRes + rarelyOrNeverRes + doNotRide;
    let onePercentFromTotal = totalResponses / 100;

    selectedData.push({
      respone: 'Often (' + (Math.round(oftenRes / onePercentFromTotal)) + '%)',
      amount: oftenRes / onePercentFromTotal
    },
      {
        respone: 'Sometimes (' + (Math.round(sometimesRes / onePercentFromTotal)) + '%)',
        amount: sometimesRes / onePercentFromTotal
      },
      {
        respone: 'Always (' + (Math.round(alwaysRes / onePercentFromTotal)) + '%)',
        amount: alwaysRes / onePercentFromTotal
      },
      {
        respone: 'Rarely or never (' + (Math.round(rarelyOrNeverRes / onePercentFromTotal)) + '%)',
        amount: rarelyOrNeverRes / onePercentFromTotal
      },
      {
        respone: 'Do not ride a bicycle (' + (Math.round(doNotRide / onePercentFromTotal)) + '%)',
        amount: doNotRide / onePercentFromTotal
      });


    //Used this resource https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    var y = d3.scaleLinear()
      .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    selectedData.forEach(function (d) {
      d.amount = +d.amount;
    });

    // Scale the range of the data in the domains
    x.domain(selectedData.map(function (d) { return d.respone; }));
    y.domain([0, d3.max(selectedData, function (d) { return d.amount; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(selectedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.respone); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.amount); })
      .attr("height", function (d) { return height - y(d.amount); });

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage(%)");

    //$('body').append('<p align="center">Dennis Kravchenko</p>')
  });


}