"use strict";
let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let displayMixin = require('../mixins/displayMixin');
let template = require("../templates/startPageView/startPageViewTpl.hbs");

export let StartPageView = Backbone.View.extend({
  className: "startPage",
  initialize: function(){

  },

  events: {
    "click button" : "_onClickButton"
  },

  _onClickButton: function(){
    this.trigger("startTestSuite");
  },

  render: function(){
    this.$el.html(template({}));
    return this;
  }
}).extend(displayMixin);
