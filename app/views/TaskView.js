"use strict";
let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let displayMixin = require('../mixins/displayMixin');

let template = require("../templates/taskView/taskViewTpl.hbs");

export let TaskView = Backbone.View.extend({
  className: "task",
  initialize: function(options) {
    options = options||{};
    this.model = options.model || new Backbone.Model();
    this._initEvents();
  },

  events:{
    "click input": "_selectMethodToWriteSolution",
    "keyup textarea": "_selectMethodToWriteSolution"
  },

  _initEvents: function(){
    this.listenTo(this.model, "change:isSolved", this._showNotification);
  },

  _selectMethodToWriteSolution: function(event){
    let target = $(event.target);

    if(this._hasOneOfClass(["string", "evaluate", "select"], target)){
      this._writeSolutionToTheModel(target)
    }

    if(this._hasOneOfClass(["multiSelect"], target)){
      this._writeMultiSolutionToTheModel(target)
    }
  },
  _hasOneOfClass: function(checkingClassList, target){
    let parents = target.parents();
    return _.some(checkingClassList, function(className){
      return parents.hasClass(className);
    })
  },

  _writeSolutionToTheModel: function(target){
    this.model.set("taskSolution",[target.val()],{silent:true})
  },

  _writeMultiSolutionToTheModel: function(target){
    let taskSolution = this.model.get("taskSolution");

    if(_.indexOf(taskSolution, target.val())>-1){
      taskSolution = _.without(taskSolution, target.val())
    }else{
      taskSolution.push(target.val())
    }

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

  render: function() {
    this.$el.html(template(this.taskData));
    return this;
  }
}).extend(displayMixin);

