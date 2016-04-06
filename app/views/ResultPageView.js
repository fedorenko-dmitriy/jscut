"use strict";

let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

let displayMixin = require('../mixins/displayMixin');

let template = require("../templates/resultPageView/resultPageViewTpl.hbs");

export let ResultPageView = Backbone.View.extend({
  className: "resultPageView",

  initialize: function (options) {
    this.model = options.model;
    this._initEvents();
  },

  events: {
    "click button": "_showTest"
  },

  _initEvents: function() {
    this.listenTo(this.model, "change", this._modelChanged);
  },

  _showTest: function() {
    this.trigger("showTest");
  },

  _modelChanged: function() {
    this.render();
  },

  render: function render() {
    console.log(this.model.toJSON().tasks);
    this.$el.html(template({data: this.model.toJSON()}));
    return this;
  }
}).extend(displayMixin);
