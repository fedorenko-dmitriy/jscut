"use strict";

var expect = require('chai').expect;
var testSuiteModel = require("../../app/models/testSuiteModel");
var testSuiteSchema = require("../../app/db/testSuiteSchema");
var BaseModel = require("../../app/models/BaseModel");

describe("TestSuite Model Tests", function(){

  xit("should be instance of BaseModel", function(){
    //ToDo should be implement...
  });

  it("should be set schema as TestSuiteSchema", function(){
    expect(testSuiteModel.getSchema()).to.equal(testSuiteSchema);
  });
});
