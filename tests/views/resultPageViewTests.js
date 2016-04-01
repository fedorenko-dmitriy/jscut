"use strict";
let Backbone = require('backbone');

import {ResultPageView} from '../../app/views/ResultPageView.js';

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

  describe("visibility", function(){
    it("should return false if 'resultPageView' hide state when method 'isShow' is called", ()=>{
      resultPageView.$el.hide();
      expect(resultPageView.isShow()).to.equal(false);
    });

    it("should return true if 'resultPageView' show state when method 'isShow' is called", ()=>{
      resultPageView.$el.show();
      expect(resultPageView.isShow()).to.equal(true);
    });

    it("should add display attribute as 'block' method 'isShow' is called", ()=>{
      resultPageView.$el.hide();
      resultPageView.show();

      expect(resultPageView.isShow()).to.equal(true);
    });

    it("should remove display attribute as 'block' method 'isShow' is called", ()=>{
      resultPageView.$el.show();
      resultPageView.hide();

      expect(resultPageView.isShow()).to.equal(false);
    });
  });

  it("should trigger event 'showTest' when button is clicked", ()=>{
    sinon.stub(resultPageView, "trigger");
    resultPageView.render();
    resultPageView.$("button").click();

    expect(resultPageView.trigger.calledWith("showTest")).to.equal(true);
  });

  it("should render when model triggered 'change'", ()=>{
    sinon.stub(resultPageView, "render");
    resultPageView.model.trigger("change");

    expect(resultPageView.render.called).to.equal(true);
  });

});
