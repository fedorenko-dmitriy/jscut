"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

import {appModel} from "./models/AppModel";
import {intervieweesView} from "./views/interviewee.js";

console.log(appModel);


appModel.get("interviewees").fetch({reset: true});


appModel.get("interviewees").once("reset", function(e){
  intervieweesView.render.apply(intervieweesView);

  $(".container").append(intervieweesView.el);
});

let MainView = Backbone.View.extend({
  className: "container",
  model: appModel,
  initialize: function(){

  },

  _initEvents: function(){
    this.listenTo(appModel.get("interviewees"), "reset", this.renderSubViews)
  },

  renderSubViews: function(){
    intervieweesView.render();
  },

  render: function(){
    $("body").append(this.$el);
  }
});

let mainView = new MainView();
mainView.render()
