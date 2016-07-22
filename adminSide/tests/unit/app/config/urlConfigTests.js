"use strict";
let _ = require("underscore");
let urlConfigData = require("../../../../src/app/config/urlsConfigData.json");

import {urlConfig} from "../../../../src/app/config/urlConfig";

describe("Url config tests", ()=>{
  afterEach(()=>{
    if(urlConfig.clear) urlConfig.clear();
  });

  it("should be function before initialization", ()=>{
    expect(typeof urlConfig).to.equal("function");
  });

  it("should initialize with argument", ()=>{
    expect(urlConfig).to.throw("should initialize with argument as JSON");
  });

  it("should initialize with argument as JSON", ()=>{
    expect(function(){urlConfig(JSON.stringify(urlConfigData))}).to.not.throw();
  });

  it("should initialize with argument as object", ()=>{
    expect(function(){urlConfig(urlConfigData)}).to.not.throw();
  });

  it("should be object after initialization", function(){
    urlConfig(urlConfigData);
    expect(_.isObject(urlConfig) && !_.isFunction(urlConfig)&& !_.isArray(urlConfig)).to.equal(true);
  });!

  it("should has method 'clear' after initialization", ()=>{
    urlConfig(urlConfigData);
    expect(typeof urlConfig.clear).to.equal("function");
  });

  it("should has method 'get' after initialization", ()=>{
    urlConfig(urlConfigData);
    expect(typeof urlConfig.get).to.equal("function");
  });

  it("should return object when method get called with name of property", ()=>{
    urlConfig(urlConfigData);
    expect(_.isObject(urlConfig.get("interviewee"))
          && !_.isFunction(urlConfig.get("interviewee"))
          &&! _.isArray(urlConfig.get("interviewee"))).to.equal(true);
  });

  /*Exceptions*/

  it("should return exception when method get called without name of property", ()=>{
    urlConfig(urlConfigData);
    expect(function(){urlConfig.get()}).to.throw('called without name of urls block name');
  });

  it("should return exception when method get called with name as not a string", ()=>{
    urlConfig(urlConfigData);
    expect(function(){urlConfig.get({})}).to.throw('called with name of urls block name as not string')
  });

  it("should return exception when method get called with name of undefined property", ()=>{
    urlConfig(urlConfigData);
    expect(function(){urlConfig.get("property")}).to.throw('you request undefined urls block');
  });
});
