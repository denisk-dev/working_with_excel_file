/**
 * author: Denis kravchenko
 */

/**
 * Class representing a Student record
 */
class Student {
  /**
   * Constructor for a Student class
   * @param {refDate} refDate
   * @param {geo} geo
   * @param {dguid} dguid
   * @param {sex} sex
   * @param {ageGroup} ageGroup
   * @param {studentResponse} studentResponse
   * @param {uom} uom
   * @param {uomId} uomId
   * @param {scalarFactor} scalarFactor
   * @param {scalarId} scalarId
   * @param {vector} vector
   * @param {coordinate} coordinate
   * @param {value} value
   * @param {status} status
   * @param {symbol} symbol
   * @param {terminated} terminated
   * @param {decimals} decimals
   */
  constructor(
    refDate,
    geo,
    dguid,
    sex,
    ageGroup,
    studentResponse,
    uom,
    uomId,
    scalarFactor,
    scalarId,
    vector,
    coordinate,
    value,
    status,
    symbol,
    terminated,
    decimals
  ) {
    this.refDate = refDate;
    this.geo = geo;
    this.dguid = dguid;
    this.sex = sex;
    this.ageGroup = ageGroup;
    this.studentResponse = studentResponse;
    this.uom = uom;
    this.uomId = uomId;
    this.scalarFactor = scalarFactor;
    this.scalarId = scalarId;
    this.vector = vector;
    this.coordinate = coordinate;
    this.value = value;
    this.status = status;
    this.symbol = symbol;
    this.terminated = terminated;
    this.decimals = decimals;
  }
}

// exporting module(class Sdtudent)
module.exports = Student;
