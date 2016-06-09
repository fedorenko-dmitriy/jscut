"use strict";

var expect = require('chai').expect;
var intervieweeModel = require("../../app/models/intervieweeModel");
var IntervieweeSchema = require("../../app/db/intervieweeSchema");
var BaseModel = require("../../app/models/BaseModel");

describe("Interviewee Model Tests", function(){

  xit("should be instance of BaseModel", function(){
    //ToDo should be implement...
  });

  it("should be set schema as IntervieweeSchema", function(){
    expect(intervieweeModel.getSchema()).to.equal(IntervieweeSchema);
  });
});
