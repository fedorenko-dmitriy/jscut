"use strict";

let $ = require("jquery-untouched");
let _ = require("underscore");
let Backbone = require('backbone');

import { timeService } from '../../../app/services/timeService';


describe.only("TimeService Tests", ()=>{
  describe("method get", ()=>{
    it("should get NULL when method 'get' called with wrong key of timeObj in argument", ()=>{
      expect(timeService.get('test')).to.equal(undefined);
    });

    it("should get timer state when method 'get' called with argument 'testIsEnded'", ()=>{
      expect(timeService.get('testIsEnded')).to.equal(false);
    });

    it("should get absoluteTime when method 'get' called with argument 'absoluteTime'", ()=>{
      expect(timeService.get('absoluteTime')).to.equal(null);
    });

    it("should get remainingTime when method 'get' called with argument 'remainingTime'", ()=>{
      expect(timeService.get('remainingTime')).to.equal(null);
    });

    it("should get timerDataObject when method 'get' called withOut argument", ()=>{
      expect(timeService.get()).to.eql({
        testIsEnded : false,
        absoluteTime : null,
        remainingTime : null
      });
    });
  });

  describe("method set", ()=>{

  });

  describe("method start", ()=>{

  });

  describe("method update", ()=>{

  });

  describe("method stop", ()=>{

  });

  describe("method timeIsUpdated", ()=>{

  });

  describe("method timeIsStopped", ()=>{

  });
});





