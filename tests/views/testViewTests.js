"use strict";
let Backbone = require('backbone');

import {TestView} from '../../app/views/TestView.js';

describe('Test View Tests', function () {
  let testView,
    testModel;

  beforeEach(()=>{
    testModel = new Backbone.Model();
    testView = new TestView({model: testModel});
    document.body.appendChild(testView.el);
  });

  afterEach(()=>{
    testView.$el.remove();
  });


  it("should get data when method 'getTestData' is called", ()=>{
    sinon.stub(testModel, "trigger");
    testView.getTestData();

    expect(testModel.trigger.called).to.equal(true);
  });

  it("should append sub views into testView.taskViews when method 'getTestData' is called", ()=>{
    testView.getTestData();
    expect(testView.taskViews).to.have.length.above(1);
  });

  it("should append sub views into taskView.$el when method 'getTestData' is called", ()=>{
    testView.getTestData();
    expect(testView.$el.children()).to.have.length.above(1);
  });

  it("should append sub views into taskView.$el when method 'getTestData' is called", ()=>{
    testView.getTestData();
    expect(testView.$el.children()).to.have.length.above(1);
  });

  //it("should check solution and set receive data to ", ()=>{
  //
  //});

  describe("navigation behaviour", ()=>{
    it("should change view to next when button 'prev' is pressed", ()=>{
      let startView;
      let currentView;
      testView.render();
      testView.getTestData();
      testView.taskViews.forEach(function(elem){
        elem.hide();
      });

      testView.taskViews[1].show();
      testView.$("button.prev").click();
      expect(testView.taskViews[1].isShow()).to.equal(false);
      expect(testView.taskViews[0].isShow()).to.equal(true);

    });

    it("should change view to next when button 'next' is pressed", ()=>{
      let startView;
      let currentView;
      testView.render();
      testView.getTestData();
      testView.taskViews.forEach(function(elem){
        elem.hide();
      });

      testView.taskViews[0].show();
      testView.$("button.next").click();
      expect(testView.taskViews[0].isShow()).to.equal(false);
      expect(testView.taskViews[1].isShow()).to.equal(true);

    });
  });
});

