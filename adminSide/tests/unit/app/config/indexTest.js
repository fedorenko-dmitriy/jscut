"use strict";

var config = require("../../../../src/app/config");

describe("Config Tests", ()=>{

  describe("method set", ()=>{
    it("should throw exception if called without first argument 'nameConfig'", ()=>{
      expect(function(){config.set()}).to.throw("first arg as 'nameConfig' is undefined");
    });

    it("should throw exception if called with first argument 'nameConfig' as non string value", ()=>{
      expect(function(){config.set(1)}).to.throw("first arg as 'nameConfig' should be a String");
    });

    it("should throw exception if called without second argument 'object'", ()=>{
      expect(function(){config.set("someName")}).to.throw("second arg as 'object' is undefined");
    });

    it("should throw exception if called with second argument 'object' as non object value", ()=>{
      expect(function(){config.set("someName", 1)}).to.throw("second arg as 'object' should be an Object");
    });

    it("should throw exception if called with second argument 'object' which hasn't method 'get'", ()=>{
      expect(function(){config.set("someName", {some:"data"})}).to.throw("second arg as 'object' should has method 'get'");
    });

    it("should return TRUE if config added without errors", ()=>{
      expect(config.set("someName", {get:function(){}}))
    });

  });


  describe("method get", ()=>{
    it("should throw exception if called without first argument 'nameConfig'", ()=>{
      expect(function(){config.get()}).to.throw("first arg as 'nameConfig' is undefined");
    });

    it("should throw exception if called with first argument 'nameConfig' as non string value", ()=>{
      expect(function(){config.get(1)}).to.throw("first arg as 'nameConfig' should be a String");
    });

    it("should throw exception if called without second argument 'query'", ()=>{
      expect(function(){config.get("someName")}).to.throw("second arg as 'query' is undefined");
    });

    it("should throw exception if called with second argument 'query' as non string value", ()=>{
      expect(function(){config.get("someName", 1)}).to.throw("second arg as 'query' should be a String");
    });

    it("should return requested object", ()=>{
      config.set("someName", {get:function(query){var obj = {"someQueryName":"someConfig"};return obj[query]}});
      expect(config.get("someName", "someQueryName")).to.equal("someConfig");
    });
  });

});
