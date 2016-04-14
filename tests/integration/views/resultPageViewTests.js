"use strict";
let Backbone = require('backbone');

import {ResultPageView} from '../../../app/views/ResultPageView.js';

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

  describe("check display init initialize", ()=>{
    it("should has method 'isShow'", ()=>{
      expect(resultPageView.isShow).to.be.an('function');
    });

    it("should has methods 'show'", ()=>{
      expect(resultPageView.show).to.be.an('function');
    });

    it("should has methods 'hide'", ()=>{
      expect(resultPageView.hide).to.be.an('function');
    });
  });
});
