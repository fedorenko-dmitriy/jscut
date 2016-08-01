"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

import {appModel} from "./models/AppModel";
import {intervieweesView} from "./views/interviewee.js";

let tmpl = require("./templates/layout/layoutTpl.html");

let template = _.template(tmpl);

console.log(appModel);

let MainView = Backbone.View.extend({
  className: "container",
  model: appModel,
  initialize: function(){
    this._initEvents();
  },

  _initEvents: function(){
    this.listenTo(appModel.get("interviewees"), "reset", this.renderSubViews)
  },

  renderSubViews: function(){
    console.log("aaaaa")
    this.$(".main").html(intervieweesView.render().el);
  },

  render: function(){
    this.$el.html(template);
    $("body").append(this.$el);
  }
});
appModel.get("interviewees").fetch({reset: true});
let mainView = new MainView();
mainView.render();
