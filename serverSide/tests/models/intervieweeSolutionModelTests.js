"use strict";

var _ = require("underscore");
var expect = require('chai').expect;
var sinon = require('sinon');
var intervieweeSolutionModel = require("../../app/models/intervieweeSolutionModel");
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
    callback(null, {some:"data", toObject: function(){return _.omit(this, "toObject")}});
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
    res.toObject = function(){return _.omit(this, "toObject")}

    callback(null, res);
  };



  intervieweeSolutionModel.setSchema(SomeSchema);
  intervieweeSolutionModel.setSchema("problemSchema", SomeSchema);

}

var requestData, itemData;


describe("Interviewee Solution Model", function(){
  beforeEach(function(){
    prepareTests();
    requestData =  {
      "interviewee_id" : 1,
      "problem_id" : 2,
      "solution" : [1,2],
      "testSuite_id" :2,
      "isSolved" : -1
    };

    itemData = {
      "id": 3,
      "type":"select",
      "name" : "Some name#3",
      "description": "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів varraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
      "variantsOfSolutions": ["a", "b", "c"],
      "rightSolution": [1],
      "points": 1
    };
  });

  describe("method checkIntervieweeSolution", function(){
    it("should return object with changed property isSolved", function(){
      SomeSchema.findOne = function(param, callback){
        SomeSchema.data = param;
        callback(null, _.extend(itemData, {toObject: function(){return _.omit(this, "toObject")}}));
      };
      intervieweeSolutionModel.checkIntervieweeSolution(callback, [requestData]);
      function callback(data){
        expect(data.isSolved).to.equal(0)
      }
    });
  });

  describe("privateMethod setRequestSolutionObj", function(){
    it("should be set requestSolutionObj as model property", function(){
      var data = {some:"data"};
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(data);

      expect(intervieweeSolutionModel.privateMethods.requestSolutionObj).to.equal(data)
    });
  });

  describe("privateMethod getRightProblemSolution", function(){
    it("should call callBack function with first argument as NULL", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.getRightProblemSolution(callback);
      function callback (err, data){
        expect(err).to.equal(null);
      }
    });

    it("should call callBack function with second argument as received data from DB", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.getRightProblemSolution(callback);
      function callback (err, data){
        expect(data).to.eql({some: "data"});
      }
    });
  });

  describe("privateMethod prepareIntervieweeProblemSolutions", function(){
    it("should call callBack function with first argument as NULL", function(done){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data){
        expect(err).to.equal(null);
        done();
      }
    });

    it("should call callBack function with second argument as argument which received from outside method", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data){
        expect(data).to.equal(itemData);
      }
    });

    it("should call callBack function with third argument as preparedSolutionObj", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj).to.eql(requestData);
      }
    });

    it("should create preparedSolutionObj with 'interviewee_id' which equals requestSolutionObj.interviewee_id", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.interviewee_id).to.eql(requestData.interviewee_id);
      }
    });

    it("should create preparedSolutionObj with 'problem_id' which equals requestSolutionObj.problem_id", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.problem_id).to.eql(requestData.problem_id);
      }
    });

    it("should create preparedSolutionObj with 'testSuite_id' which equals requestSolutionObj.testSuite_id", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.testSuite_id).to.eql(requestData.testSuite_id);
      }
    });

    it("should create preparedSolutionObj with 'solution' which equals array where item should numbers", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.solution).to.be.instanceof(Array);
      }
    });

    it("should create preparedSolutionObj with 'solution' which equals array where item should be string or integer", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        var result = true;
        _.each(preparedSolutionObj.solution, function(item){
          if(typeof item !== "string" && typeof item !== "number"){
            result = false;
          }
        });

        expect(result).to.equal(true);
      }
    });

    it("should create preparedSolutionObj with 'isSolved' which equals -1", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.prepareIntervieweeProblemSolutions(itemData, callback);
      function callback(err, data, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.isSolved).to.equal(-1);
      }
    });
  });

  describe("privateMethod compareSolutions", function(){

    it("should compare solution and set isSolved 0 if one solution item is wrong", function(){
      requestData.solution.push(2);
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);

      intervieweeSolutionModel.privateMethods.compareSolutions(itemData, requestData, callback);
      function callback(err, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.isSolved).to.equal(0);
      }
    });

    it("should compare solution and set isSolved as number of points if all solution items is right", function(){
      intervieweeSolutionModel.privateMethods.setRequestSolutionObj(requestData);
      requestData.solution = [1];
      intervieweeSolutionModel.privateMethods.compareSolutions(itemData, requestData, callback);
      function callback(err, preparedSolutionObj){

        console.log(preparedSolutionObj);

        expect(preparedSolutionObj.isSolved).to.equal(1);
      }
    });
  });

  describe("privateMethod saveIntervieweeSolution", function(){
    it("should call callBack function with affected rows after save data in DB", function(){

      //requestData.toObject = function(){return this;};

      intervieweeSolutionModel.privateMethods.saveIntervieweeSolution(requestData, callback);
      function callback(err, preparedSolutionObj){

        console.log(preparedSolutionObj);
        console.log(requestData);

        expect(preparedSolutionObj).to.eql(requestData.toObject());
      }
    });
  });
});
