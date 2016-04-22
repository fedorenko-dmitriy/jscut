"use strict";

let Backbone = require('backbone');
let helpers = require("../../../app/util/hbs-helpers");

helpers.init();
import { ResultPageView } from "../../../app/views/ResultPageView";

describe('ResultPage View Tests', function () {

  let resultPageView, model, sandbox;

  beforeEach(()=> {
    model = new Backbone.Model({tasks: new Backbone.Collection()});
    resultPageView = new ResultPageView({model: model});
    sandbox = sinon.sandbox.create();
    document.body.appendChild(resultPageView.el);
  });

  afterEach(()=> {
    sandbox.restore();
    resultPageView.$el.remove();
  });

  describe("Application Initialization", ()=>{
    it("should set model from options when view is initialized", ()=>{
      let newView = new ResultPageView({model: model});
      expect(newView.model instanceof Backbone.Model).to.equal(true);
    });
  });

  describe("Application Events",()=>{
    it("should render when model triggered 'change'", ()=>{
      sandbox.stub(resultPageView, "render");
      resultPageView.model.trigger("change");

      expect(resultPageView.render.called).to.equal(true);
    });
  });

  it("should call method html in view.$el when method 'render' is called", ()=>{
    let stub = sandbox.stub(resultPageView.$el, "html");
    resultPageView.render();
    expect(stub.called).to.equal(true);
  });

  it("should call method html in view.$el when method 'render' is called", ()=>{
    let result = resultPageView.render();
    expect(result).to.equal(resultPageView);
  });
});
