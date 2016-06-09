"use strict";

var expect = require('chai').expect;
var problemModel = require("../../app/models/problemModel");
var ProblemSchema = require("../../app/db/problemSchema");
var BaseModel = require("../../app/models/BaseModel");

describe("Problem Model Tests", function(){

  xit("should be instance of BaseModel", function(){
    //ToDo should be implement...
  });

  it("should be set schema as ProblemSchema", function(){
    expect(problemModel.getSchema()).to.equal(ProblemSchema);
  });
});
