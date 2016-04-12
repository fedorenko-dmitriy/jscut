"use strict";

let Backbone = require('backbone');
let helpers = require("../../../app/util/hbs-helpers");

helpers.init();
import { ResultPageView } from "../../../app/views/ResultPageView";

describe('ResultPage View Tests', function () {

  let resultPageView, model;

  beforeEach(()=> {
    model = new Backbone.Model();
    resultPageView = new ResultPageView({model: model});
    document.body.appendChild(resultPageView.el);
  });

  afterEach(()=> {
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
      sinon.stub(resultPageView, "render");
      resultPageView.model.trigger("change");

      expect(resultPageView.render.called).to.equal(true);
    });
  });

  it("should call method html in view.$el when method 'render' is called", ()=>{
    sinon.stub(resultPageView.$el, "html");
    resultPageView.render();
    expect(resultPageView.$el.html.called).to.equal(true);
  });

  it("should call method html in view.$el when method 'render' is called", ()=>{
    let result = resultPageView.render();
    expect(result).to.equal(resultPageView);
  });
});
