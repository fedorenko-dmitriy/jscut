"use strict";
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;
let helpers = require("./util/hbs-helpers");

let template = require("./templates/baseLayout/buttons.hbs");

helpers.init();

import { AppModel } from './models/AppModel';
import { timeService } from './services/timeService.js'

import { TestSuiteView } from './views/TestSuiteView';
import { StartPageView } from './views/StartPageView.js'
import { ResultPageView } from './views/ResultPageView';

let appModel = new AppModel(),
    startPageView = new StartPageView(),
    testSuiteView = new TestSuiteView({model: appModel}),
    resultPageView = new ResultPageView({model: appModel});

let MainView = Backbone.View.extend({
  initialize: function(){
    this._initEvents();
  },

  events: {
    "click .showStartPage": "_onClickShowStartPage",
    "click .showTestSuitePage": "_onClickShowTestSuitePage",
    "click .showResultPage": "_onClickShowResultPage"
  },

  _onClickShowStartPage: function(){
    this.trigger("method::_showStartPage");
  },

  _onClickShowTestSuitePage: function(){
    this.trigger("method::_showTestSuitePage");
  },

  _onClickShowResultPage: function(){
    this.trigger("method::_showResultPage");
  },

  _initEvents: function(){
    this.listenTo(startPageView, "startTestSuite", this._startTestSuite);
    this.listenTo(testSuiteView, "showResultsPage",this._showResultPage);
    this.listenTo(resultPageView, "showTestSuite",this._showTestSuitePage);

    this.on("method::_showStartPage", this._showStartPage);
    this.on("method::_showTestSuitePage", this._showTestSuitePage);
    this.on("method::_showResultPage", this._showResultPage);
  },

  _startTestSuite: function(){
    let self = this;
    testSuiteView.getTestSuiteData().done(function() {
      self._appendViews();
      self._showTestSuitePage();
    });
  },

  _showStartPage: function(){
    startPageView.show();
    testSuiteView.hide();
    resultPageView.hide();
  },

  _showTestSuitePage: function(){
    startPageView.hide();
    testSuiteView.show();
    resultPageView.hide();
  },

  _showResultPage: function(){
    startPageView.hide();
    testSuiteView.hide();
    resultPageView.show();
  },

  _appendViews: function(){
    $('.container').append(testSuiteView.render().$el)
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

