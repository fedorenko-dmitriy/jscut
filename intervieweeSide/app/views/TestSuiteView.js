"use strict";

let _ = require('underscore');
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

let displayMixin = require('../mixins/displayMixin');

import { testSuiteService } from "../services/testSuiteService.js";
import { problemViewFactory } from './problemViewFactory';
import { timeService } from '../services/timeService.js';

let template = require("../templates/testSuiteView/testSuiteViewTpl.hbs");

export let TestSuiteView = Backbone.View.extend(_.extend({
  className:"testSuite",

  initialize: function(options) {
    options = options||{};
    this.timeService = timeService;
    this.testSuiteService = options.testSuiteService ? options.testSuiteService : testSuiteService; // ToDo Hack: this string create only for testing
    this.model = options.model;
    this._initEvents();
    this.problemViews = [];
    this.currentView = {};
  },

  events: {
    "click button.checkSolution": "_clickBtnCheckSolution",
    "click button.problemNav" :  "_clickBtnProblemNav"
  },

  _initEvents: function(){
    this.listenTo(this.timeService, "timerIsUpdated", this.updatePageTimer);
    this.listenTo(this.timeService, "timerIsStopped", this._showResultsHandler);

    this.on("method::_checkSolutionHandler", this._checkSolutionHandler);
    this.on("method::_problemNavHandler", this._problemNavHandler);
    this.on("method::_showResultsHandler", this._showResultsHandler);
  },

  _clickBtnCheckSolution: function(){
    this.trigger("method::_checkSolutionHandler");
  },

  _clickBtnShowResults: function(){
    this.trigger("method::_showResultsHandler");
  },

  _clickBtnProblemNav: function(event){
    let direction;
    let target = $(event.target);

    if(!target.hasClass("first") && !target.hasClass("prev") && !target.hasClass("next") && !target.hasClass("last")){
      throw "problem with nav class"
    }

    target.hasClass("first") && (direction = {first: true});
    target.hasClass("prev") && (direction = {prev: true});
    target.hasClass("next") && (direction = {next: true});
    target.hasClass("last") && (direction = {last: true});

    this.trigger("method::_problemNavHandler", {direction: direction});
  },

  /*API START*/

  getTestSuiteData: function(){
    let self = this;
    let dfd = $.Deferred();

    this.testSuiteService.getTestSuite().done(function(initTestSuiteData){
      if(initTestSuiteData && initTestSuiteData.problems.length>0){
        self.setInitData(initTestSuiteData);
        dfd.resolve();
      } else{
        dfd.reject();
      }
    });

    return dfd;
  },

  setInitData: function(initTestSuiteData){
    var self = this;
    this.model.set(initTestSuiteData);
    this.timeService.start();   // ToDo test

    let problems = this.model.get("problems");

    if(problems.length>0){
      problems.each(function(model){
        let problemView = problemViewFactory.create(model);
        self.problemViews.push(problemView);
      });

      this.setCurrentView(0);
    }
    return this;
  },

  setCurrentView: function(index){
    if(_.isNumber(index) && this.problemViews[index]) {
      this._hideAllProblems();

      this.currentView = this.problemViews[index];
      this.currentView.show();
    }else{
      throw 'index not specify or view with this index undefined';
    }

    return this;
  },

  updatePageTimer: function(timeToRender) {
    this.$(".timer>.time").html(timeToRender.remainingMinutes + ":" + timeToRender.remainingSeconds);
    return this;
  },

  render: function() {
    var self = this;
    this.$el.html(template({}));
    _.each(this.problemViews, function(problemView){
      self.$(".problems").append(problemView.render().$el);
    });
    return this;
  },

  /*Controller*/

  _checkSolutionHandler: function(){
    let self = this;
    let model = this.currentView.model;
    this.testSuiteService.checkProblemSolution(model.toJSON()).done(function(result){
      result = JSON.parse(result);

      self.timeService.update();

      self.model.trigger("change", self.model);
    });
  },

  _showResultsHandler: function(){
    this.trigger("showResultsPage");
  },

  _problemNavHandler: function(data){
    let index = this.problemViews.indexOf(this.currentView);

    data.direction.first && this._showFirstProblem();
    data.direction.prev && this._showPrevProblem(index);
    data.direction.next && this._showNextProblem(index);
    data.direction.last && this._showLastProblem();
  },

  _showFirstProblem: function(){
    let index = 0;
    this.setCurrentView(index);
  },

  _showPrevProblem: function(index){
    if(!this.problemViews[index-1]){ return; }
    this.setCurrentView(index-1);
  },

  _showNextProblem: function(index){
    if(!this.problemViews[index+1]){ return; }

    this.setCurrentView(index+1);
  },

  _showLastProblem: function(){
    let index = this.problemViews.length-1;
    this.setCurrentView(index);
  },

  _hideAllProblems: function(){
    this.problemViews.forEach(function(problemView){
      problemView.hide();
    });
  }

},displayMixin));

