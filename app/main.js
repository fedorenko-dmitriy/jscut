"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
let helpers = require("./util/hbs-helpers");

let template = require("./templates/baseLayout/buttons.hbs");

helpers.init();

Backbone.$ = $;

import { TestView } from './views/TestView';
import { AppModel } from './models/AppModel'
import { ResultPageView } from './views/ResultPageView';
import { timeService } from './services/timeService.js'

let appModel = new AppModel({timeService: timeService}),
    testView = new TestView({model: appModel}),
    resultPageView = new ResultPageView({model: appModel});

testView.getTestData();


let MainView = Backbone.View.extend({
  initialize: function(){
    this._initEvents();
  },

  events: {
    "click .showStartPage": "_onClickShowStartPage",
    "click .showTestPage": "_onClickShowTestPage",
    "click .showResultPage": "_onClickShowResultPage"
  },

  _onClickShowStartPage: function(){
    this.trigger("method::_showStartPage");
  },

  _onClickShowTestPage: function(){
    this.trigger("method::_showTestPage");
  },

  _onClickShowResultPage: function(){
    this.trigger("method::_showResultPage");
  },

  _initEvents: function(){
    this.listenTo(testView, "showResultsPage",this._showResultPage);
    this.listenTo(resultPageView, "showTest",this._showTestPage);

    this.on("method::_showStartPage", this._showStartPage);
    this.on("method::_showTestPage", this._showTestPage);
    this.on("method::_showResultPage", this._showResultPage);
  },

  _showStartPage: function(){
    console.log("not implement");
    //ToDo to implement
    testView.hide();
    resultPageView.hide();
  },

  _showTestPage: function(){
    testView.show();
    resultPageView.hide();
  },

  _showResultPage: function(){
    testView.hide();
    resultPageView.show();
  },

  render: function(){
    this.$el.html(template({}));
    $('.container').append(this.$el)
                   .append(testView.render().$el)
                   .append(resultPageView.render().$el);
    this._showTestPage();
    return this;
  }
});


new MainView({appModel: appModel}).render();

