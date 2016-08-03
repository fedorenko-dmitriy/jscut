"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

import {appModel} from "./models/AppModel";
import {intervieweesView} from "./views/interviewee.js";
import {problemsView} from "./views/problems.js";
import {testSuitesView} from "./views/testSuites.js";

let tmpl = require("./templates/layout/layoutTpl.html");

let template = _.template(tmpl);

console.log(appModel);

let MainView = Backbone.View.extend({
  model: appModel,
  initialize: function(){
    this._initEvents();
  },

  _initEvents: function(){
    this.listenTo(appModel.get("interviewees"), "reset", this._renderIntervieweesPage);
    this.listenTo(appModel.get("problems"), "reset", this._renderProblemsPage);
    this.listenTo(appModel.get("testSuites"), "reset", this._renderTestSuitesPage);
  },

  _renderIntervieweesPage: function(){
    this.$(".main").html(intervieweesView.render().el);
  },

  _renderProblemsPage: function(){
    this.$(".main").html(problemsView.render().el);
  },

  _renderTestSuitesPage: function(){
    this.$(".main").html(testSuitesView.render().el);
  },

  render: function(){
    this.$el.html(template);
    $("body").append(this.$el);
  }
});

//appModel.get("interviewees").fetch({reset: true});
//appModel.get("problems").fetch({reset: true});
appModel.get("testSuites").fetch({reset: true});

let mainView = new MainView();
mainView.render();
