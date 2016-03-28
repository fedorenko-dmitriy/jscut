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
  })
});
