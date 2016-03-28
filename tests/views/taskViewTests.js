"use strict";
//let $ = require('jquery-untouched');
let Backbone = require('backbone');
//Backbone.$ = $;


import {TaskView} from '../../app/views/TaskView.js';

describe('Task View Tests', function () {

  let taskView;

  beforeEach(()=>{
    taskView = new TaskView();
  });

  describe("method prepareData", ()=>{
    it('should convert task data to JSON when method is called', ()=>{
      let taskData = {"some": "data"};
      taskView.model = new Backbone.Model(taskData);
      taskView.prepareData();
      expect(taskView.taskData).to.eql(taskData);
    });

  });

  it("should render when model trigger event 'change'", ()=>{
    let taskData = {"some": "data"};
    sinon.spy(taskView,"render");
    taskView.model.set(taskData);

    expect(taskView.render.called).to.equal(true);
  });

  it("should trigger event 'checkSolution' when button clicked", ()=>{
    let taskData = {"some": "data"};
    taskView.model = new Backbone.Model(taskData);
    taskView.prepareData().render();
    sinon.spy(taskView,"trigger");

    taskView.$("button").click();

    expect(taskView.trigger.calledWith("checkSolution")).to.equal(true);
  });

  it("should send model.attributes when event 'checkSolution' triggered", ()=>{
    let taskData = {"some": "data"};
    taskView.model = new Backbone.Model(taskData);
    taskView.prepareData().render();
    sinon.spy(taskView,"trigger");

    taskView.$("button").click();

    expect(taskView.trigger.calledWith("checkSolution", taskView.model.toJSON())).to.equal(true);
  });
});
