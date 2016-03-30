"use strict";
let Backbone = require('backbone');

import {TestView} from '../../app/views/TestView.js';

describe('Test View Tests', function () {
  let testView,
    testModel;

  beforeEach(()=>{
    testModel = new Backbone.Model();
    testView = new TestView({model: testModel});
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

});

