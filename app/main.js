"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;
let helpers = require("./util/hbs-helpers");

let template = require("./templates/baseLayout/buttons.hbs");

helpers.init();

import { AppModel } from './models/AppModel';
import { timeService } from './services/timeService.js'

import { TestView } from './views/TestView';
import { StartPageView } from './views/StartPageView.js'
import { ResultPageView } from './views/ResultPageView';

let appModel = new AppModel({timeService: timeService}),
    startPageView = new StartPageView(),
    testView = new TestView({model: appModel}),
    resultPageView = new ResultPageView({model: appModel});

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
    this.listenTo(startPageView, "startTestSuite", this._startTestSuite);
    this.listenTo(testView, "showResultsPage",this._showResultPage);
    this.listenTo(resultPageView, "showTest",this._showTestPage);

    this.on("method::_showStartPage", this._showStartPage);
    this.on("method::_showTestPage", this._showTestPage);
    this.on("method::_showResultPage", this._showResultPage);
  },

  _startTestSuite: function(){
    let self = this;
    testView.getTestData().done(function() {
      self._appendViews();
      self._showTestPage();
    });
  },

  _showStartPage: function(){
    startPageView.show();
    testView.hide();
    resultPageView.hide();
  },

  _showTestPage: function(){
    startPageView.hide();
    testView.show();
    resultPageView.hide();
  },

  _showResultPage: function(){
    startPageView.hide();
    testView.hide();
    resultPageView.show();
  },

  _appendViews: function(){
    $('.container').append(testView.render().$el)
      .append(resultPageView.render().$el);
  },

  render: function(){
    this.$el.html(template({}));
    $('.container').append(this.$el)
                   .append(startPageView.render().$el);
    this._showStartPage();
    return this;
  }
});

new MainView({appModel: appModel}).render();

