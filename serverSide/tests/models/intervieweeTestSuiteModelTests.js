"use strict";

var _ = require("underscore");
var expect = require('chai').expect;
var sinon = require('sinon');

var model = require("../../app/models/intervieweeTestSuiteModel");
var SomeSchema;

function prepareTests(){
  SomeSchema = function(data){
    SomeSchema.err = false;

    if(SomeSchema.data && SomeSchema.data.id && SomeSchema.data.id === data.id){
      SomeSchema.err = true;
    }else{
      SomeSchema.data = data
    }

  };

  SomeSchema.collection = {
    drop: function(callback){
      callback();
    }
  };

  SomeSchema.find = function(param, callback){
    SomeSchema.data = param;
    callback(null, SomeSchema.data);
  };

  SomeSchema.findOne = function(param, callback){
    SomeSchema.data = param;
    callback(null, {some:"data"});
  };

  SomeSchema.findOneAndUpdate = function(param, updateObj, options, callback){
    var res;
    options = options||{};
    if(!options.new){
      res = SomeSchema.data
    }

    if(options.new){
      res = updateObj;
    }

    callback(null, res);
  };

  SomeSchema.remove = function(param, callback){
    if(SomeSchema.data.id === param.id) {
      var res = {result:{ok:1}}
    }
    callback(null,  res);
  };

  SomeSchema.prototype = {
    save: function(callback){
      var err = SomeSchema.err;
      callback(err, SomeSchema.data);
    }
  };

  model.setSchema(SomeSchema);
  model.setSchema("testSuiteSchema", SomeSchema);
  model.setSchema("intervieweeSchema", SomeSchema);
  model.setSchema("problemSchema", SomeSchema);

}

describe("Interviewee Test Suite Model", function(){
  beforeEach(function(){
    prepareTests();
    model.preparedData = {
      id : 1,
      interviewee: {},
      testSuite: {},
      solutions:[],
      problems: []
    };
  });

  describe("method getById", function(){
    it("should call callBack with prepared data", function(){
      model.getByIdAllData(callback, {id:2});
      function callback(data){
        expect(data[0]).to.eql(model.preparedData);
        expect(model.preparedData.id).to.eql(2);
      }
    });
  });

  describe("privateMethod getIntervieweeTestSuiteData", function(){
    it("should call callBack function with first argument as NULL", function(){
      model.privateMethods.getIntervieweeTestSuiteData(callback);
      function callback(err, data){
        expect(err).to.eql(null);
      }
    });

    it("should set 'testSuite' as received data from DB", function(){
      model.privateMethods.getIntervieweeTestSuiteData(callback);
      function callback(err, data){
        expect(data).to.eql({some:"data"});
      }
    });

    it("should call callBack function", function(){
      var stub = sinon.stub();
      model.privateMethods.getIntervieweeTestSuiteData(stub);
      expect(stub.called).to.equal(true);
    });
  });

  describe("privateMethod getTestSuiteData", function(){
    it("should call callBack function with first argument as NULL", function(){
      model.privateMethods.getTestSuiteData({another:"data"}, callback);
      function callback(err, data){
        expect(err).to.eql(null);
      }
    });

    it("should set 'intervieweeData' as received data from DB", function(){
      model.privateMethods.getTestSuiteData({another:"data"}, callback);
      function callback(err, data){
        expect(model.preparedData.testSuite).to.eql({some:"data"});
      }
    });

    it("should call callBack function with second argument as argument which received from outside method", function(){
      model.privateMethods.getTestSuiteData({another:"data"}, callback);
      function callback(err, data){
        expect(data).to.eql({another:"data"});
      }
    });
  });

  describe("privateMethod getIntervieweeData", function(){
    it("should call callBack function with first argument as NULL", function(){
      model.privateMethods.getIntervieweeData({another:"data"}, callback);
      function callback(err, data){
        expect(err).to.eql(null);
      }
    });

    it("should set 'intervieweeData' as received data from DB", function(){
      model.privateMethods.getIntervieweeData({another:"data"}, callback);
      function callback(err, data){
        expect(model.preparedData.interviewee).to.eql({some:"data"});
      }
    });

    it("should call callBack function with second argument as argument which received from outside method", function(){
      model.privateMethods.getIntervieweeData({another:"data"}, callback);
      function callback(err, data){
        expect(data).to.eql({another:"data"});
      }
    });
  });

  describe("privateMethod getProblemsData", function(){
    it("should call callBack function with first argument as NULL", function(){
      console.log("model.schema")
      console.log(model.schema)
      model.privateMethods.getProblemsData({another:"data"}, callback);
      function callback(err, data){
        expect(err).to.eql(null);
      }
    });

    it("should fill 'problems' as received data from DB", function(){
      model.preparedData.testSuite.problems = [1,2,3]
      model.privateMethods.getProblemsData({another:"data"}, callback);
      function callback(err, data){
        expect(model.preparedData.problems).to.have.length(3);
      }
    });

    it("should delete from testSuite property problems", function(){
      model.preparedData.testSuite.problems = [1,2,3]
      model.privateMethods.getProblemsData({another:"data"}, callback);
      function callback(err, data){
        expect(model.preparedData.testSuite.problems).not.to.exist;
      }
    });
  });
});
