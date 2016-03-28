"use strict"
var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;

import { TestView } from './views/TestView';

let testView = new TestView();

testView.getTestData();

  $('body').append(testView.render().$el);
