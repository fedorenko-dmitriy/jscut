"use strict";
var expect = require('chai').expect;
var sinon = require('sinon');
var BaseModel = require("../../app/models/BaseModel");
//var mongoose = require("../../app/libs/mongoose");


var mongoose = {
  disconnect: function(){},
  connection:{
    on: function(name, callback){
      console.log("ssss")
      mongoose.events[name] = callback;
      mongoose.connection.trigger(name);
    },
    trigger: function(name){
      mongoose.events[name]();
    }
  },
  events: {}
};

var SomeSchema = function(data){
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


var baseModel, sandbox;

describe("baseModel tests", function(){

  beforeEach(function(){
    SomeSchema.data = {};
    baseModel = new BaseModel();
    baseModel.setSchema(SomeSchema);
    baseModel.mongoose = mongoose;

    sandbox = sinon.sandbox.create();
  });

  afterEach(function(){
    sandbox.restore();
  });


  describe("method setSchema", function(){
    it("should set schema when method is called", function(){
      baseModel.setSchema(SomeSchema);

      expect(baseModel.getSchema()).to.equal(SomeSchema);
    });
  });

  xdescribe("method getSchema", function(){
    //ToDo exceptions!!!
    xit("should throw exception if schema undefined, when method is called", function(){
      baseModel.setSchema(undefined);
      expect(function(){baseModel.getSchema()}).to.throw("Should define schema as object");
    });

    xit("should throw exception if schema is array, when method is called", function(){
      baseModel.setSchema([]);
      expect(function(){baseModel.getSchema()}).to.throw("Should define schema as object");
    });

    xit("should throw exception if schema is string, when method is called", function(){
      baseModel.setSchema("string");
      expect(function(){baseModel.getSchema()}).to.throw("Should define schema as object");
    });

    xit("should throw exception if schema is number, when method is called", function(){
      baseModel.setSchema(1);
      expect(function(){baseModel.getSchema()}).to.throw("Should define schema as object");
    });

    xit("should throw exception if schema is boolean, when method is called", function(){
      baseModel.setSchema(true);
      expect(function(){baseModel.getSchema()}).to.throw("Should define schema as object");
    });
  });

  describe("method create", function(){
    it("should pass second argument as array when method is called", function(){
      var callback = function(){};
      expect(function(){baseModel.create(callback, {})}).to.throw("Should define second argument as array");
    });

    it("should throw exception if data duplicate row in DB when method is called", function(){
      var callback = function(){};
      baseModel.create(callback, [{id:1, name:"aaa"}]);
      expect(function(){baseModel.create(callback, [{id:1, name:"aaa"}])}).to.throw();
    });

    it("should call callback function with argument as array", function(){
      var data = [{id:1, name:"aaa"}];
      baseModel.create(callback, data);

      function callback(affectedRow){

        expect(affectedRow).to.be.instanceof(Array);
      }
      checkMongooseDisconnection("create");
    });

    it("should call callback function when all data is added in DB", function(){
      var data = [{id:1, name:"aaa"}];
      baseModel.create(callback, data);

      function callback(affectedRow){

        expect(affectedRow[0].id).to.equal(data[0].id);
        expect(affectedRow[0].name).to.equal(data[0].name);
      }
      checkMongooseDisconnection("create");
    });
  });

  describe("method read", function(){
    it("should pass second argument as object when method is called", function(){
      var callback = function(){};
      expect(function(){baseModel.read(callback, [])}).to.throw("Should define second argument as object")
    });

    it("should call callBackFunction with returned data when data is got from DB", function(done){
      var data = {id:1};
      baseModel.read(callback, data);

      function callback(affectedRow){
        expect(affectedRow.id).to.equal(data.id);
        done();
      }
      checkMongooseDisconnection("read");
    });
  });

  describe("method update", function(){
    it("should call callbackFunction whit affected rows from DB when DB is returned data", function(done){
      var data = {id:1, name: "name2"};
      baseModel.update(callback, data, {new:true});

      function callback(affectedRow){
        expect(affectedRow.name).to.equal("name2");
        done();
      }
      checkMongooseDisconnection("update");
    });
  });

  describe("method remove", function(){
    it("should pass second argument as array when method is called", function(){
      var callback = function(){};
      expect(function(){baseModel.remove(callback, [])}).to.throw("Should define second argument as object");
    });

    it("should call callbackFunction whit affected rows from DB when DB is returned data", function(done){
      baseModel.create(callbackCreate, [{id:2, name: "name2"}]);
      baseModel.remove(callbackRemove, {id:2});
      function callbackCreate(){}

      function callbackRemove(affectedRow){
        expect(affectedRow.result.ok).to.eql(1);
        done();
      }
      checkMongooseDisconnection("update");
    });
  });

  describe("method drop", function(){
    it("should drop collection and called callBack function, when method is called", function(){
      var stub = sandbox.stub();
      baseModel.drop(stub);
      expect(stub.called).to.equal(true);
      checkMongooseDisconnection("drop");
    });
  });
});

function checkFirstArgumentAsFunction(testingMethod){
  it("should pass first argument as callbackFunction whem method is called", function(){
    expect(function(){testingMethod()}).to.throw("Should define first argument as function");
  });
}

function checkMongooseDisconnection(methodName){
  it("should call method 'disconnect' after method "+methodName+" executed", function(){
    var stub = sandbox.stub(baseModel.mongoose, 'disconnect');
    expect(stub.called).to.equal(true);
  });
}
