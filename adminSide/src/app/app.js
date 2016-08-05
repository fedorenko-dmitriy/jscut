"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

import {mainView} from "./main.js"

let App = Backbone.Router.extend({
  routes: {
    "interviewees" : "interviewees",
    "testSuites" : "testSuites",
    "problems" : "problems",
    "intervieweeSolution" : "intervieweeSolution",
    "intervieweeTestSuites" : "intervieweeTestSuites"
  },

  interviewees : function(){
    let collection = mainView.model.get("interviewees");
    if(collection.length === 0){
      collection.fetch({reset: true});
    }else{
      collection.fetch();
    }
  },

  testSuites : function(){

  },

  problems : function(){
    let collection = mainView.model.get("problems");
    if(collection.length === 0){
      collection.fetch({reset: true});
    }else{
      collection.fetch();
    }
  },

  "intervieweeSolution" : function(){

  },

  "intervieweeTestSuites" : function(){

  }

});

  new App();
  Backbone.history.start();

