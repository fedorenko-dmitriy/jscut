"use strict"
var $ = require('jquery-untouched');
var Backbone = require('backbone');
var helpers = require("./util/hbs-helpers");

helpers.init();

Backbone.$ = $;

import { TestView } from './views/TestView';
import { AppModel } from './models/AppModel'
import { ResultPageView } from './views/ResultPageView';

let appModel = new AppModel(),
    testView = new TestView({model: appModel}),
    resultPageView = new ResultPageView({model: appModel});

testView.getTestData();


let MainView = Backbone.View.extend({
  initialize: function(){
    this._initEvents();
  },

  _initEvents: function(){
    this.listenTo(testView, "showResults",this._showResultPage);
    this.listenTo(resultPageView, "showTest",this._showTestPage);
  },

  _showResultPage: function(){
    testView.hide();
    resultPageView.show();
  },

  _showTestPage: function(){
    testView.show();
    resultPageView.hide();
  },

  render: function(){
    $('body').append(testView.render().$el);
    $('body').append(resultPageView.render().$el);
    this._showTestPage();
    return this;
  }
});


new MainView({appModel: appModel}).render();

