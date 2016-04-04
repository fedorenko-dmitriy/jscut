"use strict";
let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let template = require("../templates/taskView/taskViewTpl.hbs");

export let TaskView = Backbone.View.extend({
  className: "task",
  initialize: function(options) {
    options = options||{};
    this.model = options.model || new Backbone.Model();
    this._initEvents();
  },

  events:{
    "click button": "_clickBtnHandler",
    "click input": "_selectMethodToWriteSolution",
    "keyup textarea": "_selectMethodToWriteSolution"
  },

  _initEvents: function(){
    this.listenTo(this.model, "change:isSolved", this._showNotification);
  },

  _clickBtnHandler: function(){
    this.trigger("checkSolution", this.model);
  },

  _selectMethodToWriteSolution: function(event){
    let target = $(event.target);

    if(target.parents(".string").length || target.parents(".evaluate").length){
      this._writeStringSolutionToTheModel(target);
    }else if(target.parents(".select").length){
      this._writeSelectSolutionToTheModel(target);
    }else if(target.parents(".multiSelect").length){
      this._writeMultiSelectSolutionToTheModel(target);
    }else{
      throw "something wrong with solution type";
    }
  },

  _writeStringSolutionToTheModel: function(target){
    this.model.set("taskSolution",[target.val()],{silent:true})
  },

  _writeSelectSolutionToTheModel: function(target){
    console.log("select "+target.val());
    this.model.set("taskSolution",[target.val()],{silent:true})
  },

  _writeMultiSelectSolutionToTheModel: function(target){
    let taskSolution = this.model.get("taskSolution");
    console.log("multiSelect a " +taskSolution.toString());
    if(_.indexOf(taskSolution, target.val())>-1){
      taskSolution = _.without(taskSolution, target.val())
    }else{
      taskSolution.push(target.val())
    }
    console.log("multiSelect b " +taskSolution.toString());
    this.model.set("taskSolution",taskSolution,{silent:true})
  },

  _showNotification: function(){
    this.$(".notification").removeClass("show");
    if(this.model.get("isSolved")){
      this.$(".success").addClass("show");
    } else {
      this.$(".error").addClass("show");
    }
  },

  prepareData: function(){
    this.taskData = this.model.toJSON();
    return this;
  },

  show: function(){
    this.$el.show();
  },

  hide: function(){
    this.$el.hide();
  },

  isShow: function(){
    if(!this.$el.css("display") && !this.$el.height() && !this.$el.width()){
      return false;
    }else if(this.$el.css("display") && this.$el.css("display") == "none"){
      return false;
    }else if(this.$el.css("display") && this.$el.css("display") !== "none"){
      return true;
    }
  },

  render: function() {
    this.$el.html(template(this.taskData));
    return this;
  }
});

