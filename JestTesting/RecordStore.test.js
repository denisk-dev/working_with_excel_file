/** 
* author: Dennis kravchenko
* class: CST 8333 
* Algonquin College
* 2020-03-25
*/

/**
 * Getting the readStudentsData() method from RecordStore.js
 * @type{object}
 */
const readCSV = require('../persistence/RecordStore.js');

/**
 * Making sure the we can read csv file using readStudentsData method
 */
test('Making sure the we can read csv file using readStudentsData method', ()=>{
  expect(readCSV.readStudentsData('./JestTesting/test.csv')).toEqual([
     {
      refDate: '2002',
      geo: 'Canada',
      dguid: '',
      sex: 'Males',
      ageGroup: '11 years',
      studentResponse: 'Rarely or never',
      uom: 'Percent',
      uomId: '239',
      scalarFactor: 'units ',
      scalarId: '0',
      vector: 'v30413271',
      coordinate: '1.1.1.1',
      value: '31',
      status: '',
      symbol: '',
      terminated: '',
      decimals: '0'
    }
  ])
});