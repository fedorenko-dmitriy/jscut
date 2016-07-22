"use strict";

import {baseService} from "../../../../src/app/services/baseService.js"

xdescribe("Base Service Tests", ()=>{

  let server;
  beforeEach(()=>{
    baseService.setUrlsConfig({
      create:"/some/url",
      readByQuery:"/some/url",
      readById:"/some/url/",
      updateById:"/some/url/",
      deleteById:"/some/url/"
    });
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });

  afterEach(()=>{
    server.restore();
  });

  describe("method setUrlsConfig", ()=>{
    it("should throw exception if method called without config",()=>{
      expect(()=>{baseService.setUrlsConfig()}).to.throw("passed config is undefined");
    });

    it("should throw exception if method called with config as non Object value", ()=>{
      expect(()=>{baseService.setUrlsConfig(1)}).to.throw("passed config should be an Object");
    });

    it("should set urlConfig and return TRUE", function(){
      expect(baseService.setUrlsConfig({})).to.equal(true);
    });
  });

  describe("method getUrl", ()=>{
    it("should throw exception if method call without param", ()=>{
      expect(()=>{baseService.getUrl()}).to.throw("passed name is undefined");
    });

    it("should throw exceptions if method called with param is non String value", ()=>{
      expect(()=>{baseService.getUrl(1)}).to.throw("passed name should be an String");
    });

    it("should throw exception if method called with name of undefined property", ()=>{
      baseService.setUrlsConfig({});
      expect(()=>{baseService.getUrl("someName")}).to.throw("requested url not found");
    });

    it("should return string when method called with name", ()=>{
      baseService.setUrlsConfig({someName: "someUrl"});
      expect(baseService.getUrl("someName")).to.equal("someUrl");
    });
  });


  describe("method create", ()=>{
    it("should return deferred object", ()=>{
      var deferred = baseService.create({"some":"data"});
      expect(typeof deferred.then).to.equal("function");
      expect(typeof deferred.error).to.equal("function");
      expect(typeof deferred.always).to.equal("function");
    });

    it("should send POST request",()=>{
      baseService.create({"some":"data"});
      expect(server.requests[0].method).to.equals("POST");
    });

    it("should send request to url", ()=>{
      baseService.create({"some":"data"});
      expect(server.requests[0].url).to.equals("/some/url");
    });

    it("should send data without changing", ()=>{
      baseService.create({"some":"data"});
      expect(server.requests[0].requestBody).to.eql("some=data");
    });

    it("should return data from server as array", function(){
      server.respondWith("POST", "/some/url",
        [200, { "Content-Type": "application/json" },
          '[]']);

      var deferred = baseService.create({"some":"data"});
      server.respond();
      deferred.then(function(data){
        expect(data).to.eql([])
      });
    });
  });

  describe("method readByQuery", ()=>{
    it("should return deferred object", ()=>{
      var deferred = baseService.readByQuery({"some":"data"});
      expect(typeof deferred.then).to.equal("function");
      expect(typeof deferred.error).to.equal("function");
      expect(typeof deferred.always).to.equal("function");
    });

    it("should send GET request",()=>{
      baseService.readByQuery({"some":"data"});
      expect(server.requests[0].method).to.equals("GET");
    });

    it("should send request to url", ()=>{
      baseService.readByQuery({"some":"data"});
      expect(server.requests[0].url).to.equals("/some/url?some=data");
    });

    it("should return data from server as array", function() {
      server.respondWith("GET", "/some/url", [200, {"Content-Type": "application/json"}, '[]']);

      var deferred = baseService.readByQuery({"some": "data"});
      server.respond();
      deferred.then(function(data) {
        expect(data).to.eql([])
      });
    });
  });

  describe("method readById", ()=>{
    it("should return deferred object", ()=>{
      var deferred = baseService.readById({"some":"data"});
      expect(typeof deferred.then).to.equal("function");
      expect(typeof deferred.error).to.equal("function");
      expect(typeof deferred.always).to.equal("function");
    });

    it("should send GET request",()=>{
      baseService.readById({"some":"data"});
      expect(server.requests[0].method).to.equals("GET");
    });

    it("should send request to url", ()=>{
      baseService.readById(1);
      expect(server.requests[0].url).to.equals("/some/url/1");
    });

    it("should return data from server as array", function() {
      server.respondWith("GET", "/some/url/1", [200, {"Content-Type": "application/json"}, '[]']);

      var deferred = baseService.readById({"some": "data"});
      server.respond();
      deferred.then(function(data) {
        expect(data).to.eql([])
      });
    });
  });

  describe("method updateById", ()=>{
    it("should return deferred object", ()=>{
      var deferred = baseService.updateById({"some":"data"});
      expect(typeof deferred.then).to.equal("function");
      expect(typeof deferred.error).to.equal("function");
      expect(typeof deferred.always).to.equal("function");
    });

    it("should send PUT request",()=>{
      baseService.updateById({"some":"data"});
      expect(server.requests[0].method).to.equals("PUT");
    });

    it("should send request to url", ()=>{
      baseService.updateById(1);
      expect(server.requests[0].url).to.equals("/some/url/1");
    });

    it("should return data from server as object", function() {
      server.respondWith("PUT", "/some/url/1", [200, {"Content-Type": "application/json"}, '{}']);

      var deferred = baseService.updateById({"some": "data"});
      server.respond();
      deferred.then(function(data) {
        expect(data).to.eql({})
      });
    });
  });

  describe("method deleteById", ()=>{

    it("should return deferred object", ()=>{
      var deferred = baseService.deleteById({"some":"data"});
      expect(typeof deferred.then).to.equal("function");
      expect(typeof deferred.error).to.equal("function");
      expect(typeof deferred.always).to.equal("function");
    });

    it("should send DELETE request",()=>{
      baseService.deleteById({"some":"data"});
      expect(server.requests[0].method).to.equals("DELETE");
    });

    it("should send request to url", ()=>{
      baseService.deleteById(1);
      expect(server.requests[0].url).to.equals("/some/url/1");
    });

    it("should return data from server as object", function() {
      server.respondWith("DELETE", "/some/url/1", [200, {"Content-Type": "application/json"}, '{ok:1,n:1}']);

      var deferred = baseService.deleteById({"some": "data"});
      server.respond();
      deferred.then(function(data) {
        expect(data.ok).to.equal(1);
        expect(data.n).to.equal(1);
      });
    });
  });
});
