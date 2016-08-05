"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

import {appModel} from "./models/AppModel";
import {intervieweesView} from "./views/interviewee.js";
import {problemsView} from "./views/problems.js";
import {testSuitesView} from "./views/testSuites.js";
import {intervieweesSolutionsView} from "./views/intervieweeSolutions.js";
import {intervieweeTestSuitesView} from "./views/intervieweeTestSuites.js";

let tmpl = require("./templates/layout/layoutTpl.html");

let template = _.template(tmpl);

console.log(appModel);

export let mainView = new(Backbone.View.extend({
  model: appModel,
  initialize: function(){
    this._initEvents();

    this.subViews = {
      "interviewees" : intervieweesView,
      "testSuites" : testSuitesView,
      "problems" : problemsView,
      "intervieweeSolution" : intervieweesSolutionsView,
      "intervieweeTestSuites" : intervieweeTestSuitesView
    };
  },

  _initEvents: function(){
    this.listenTo(appModel.get("interviewees"), "reset", this._renderIntervieweesPage);
    this.listenTo(appModel.get("problems"), "reset", this._renderProblemsPage);
    this.listenTo(appModel.get("testSuites"), "reset", this._renderTestSuitesPage);
    this.listenTo(appModel.get("intervieweeSolutions"), "reset", this._renderIntervieweesSolutionsPage);
    this.listenTo(appModel.get("intervieweeTestSuites"), "reset", this._renderIntervieweeTestSuitesPage);
  },

  _renderIntervieweesPage: function(){
    if(this.$(".interviewees")){
      this.$(".main").append(intervieweesView.render().el);
    }else{
      this._hideAll();
      intervieweesView.show();
    }
  },

  _renderProblemsPage: function(){
    if(this.$(".problems")){
      this.$(".main").append(problemsView.render().el);
    }else{
      this._hideAll();
      problemsView.show();
    }
  },

  _renderTestSuitesPage: function(){
    this.$(".main").append(testSuitesView.render().el);
  },

  _renderIntervieweesSolutionsPage: function(){
    this.$(".main").append(intervieweesSolutionsView.render().el);
  },

  _renderIntervieweeTestSuitesPage: function(){
    this.$(".main").append(intervieweeTestSuitesView.render().el);
  },

  _hideAll: function(){
    _.each(this.subViews, (item)=>{
      item.hide();
    })
  },

  render: function(){
    this.$el.html(template);
    $("body").append(this.$el);
  }
}))();

//appModel.get("interviewees").fetch({reset: true});
//appModel.get("problems").fetch({reset: true});
//appModel.get("testSuites").fetch({reset: true});
//appModel.get("intervieweeSolutions").fetch({reset: true});
//appModel.get("intervieweeTestSuites").fetch({reset: true});

mainView.render();

