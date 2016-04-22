"use strict";

let Backbone = require('backbone');
var helpers = require("../../../app/util/hbs-helpers");

helpers.init();

import { StartPageView  } from "../../../app/views/StartPageView";

describe('StartPageView Tests', function () {

  let startPageView,
      sandbox;

  beforeEach(()=>{
    startPageView = new StartPageView();
    document.body.appendChild(startPageView.el);
    sandbox = sinon.sandbox.create();
  });

  afterEach(()=>{
    sandbox.restore();
  });

  describe("Rendering", ()=>{
    it("should return this when method 'render' is called", ()=>{
      let result = startPageView.render();
      expect(result).to.equal(startPageView);
    });

    it("shouldn't any children in $el before method is render", ()=>{
      expect(startPageView.$el.children()).to.have.lengthOf(0);
    });

    it("should render template when method 'render' is called", ()=>{
      startPageView.render();
      expect(startPageView.$el.children()).to.have.length.above(0);
    });
  });

  describe("DOM Events", ()=>{
    it("should trigger event 'startTestSuite' when button is clicked", ()=>{
      let stub = sandbox.stub(startPageView, "trigger");
      startPageView.render();
      startPageView.$("button").click();
      expect(stub.calledWith("startTestSuite")).to.equal(true);
    });
  });
});
