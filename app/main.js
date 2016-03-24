"use strict"
var $ = require('jquery-untouched');
var Backbone = require('backbone');
Backbone.$ = $;

import { taskView } from './views/taskView';


$('body').append(taskView.render().$el);


