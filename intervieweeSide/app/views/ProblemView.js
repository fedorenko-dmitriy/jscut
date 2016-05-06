"use strict";
let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let displayMixin = require('../mixins/displayMixin');

let template = require("../templates/problemView/problemViewTpl.hbs");

export let ProblemView = Backbone.View.extend({
  className: "problem",
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

    this.on("method::_setSolutionToTheModel", this._setSolutionToTheModel);
    this.on("method::_setMultiSolutionToTheModel", this._setMultiSolutionToTheModel);
  },

  _selectMethodToWriteSolution: function(event){
    let target = $(event.target);
    let value = target.val();

    if(this._hasOneOfClass(["string", "evaluate", "select"], target)){
      this.trigger("method::_setSolutionToTheModel", value);
    }

    if(this._hasOneOfClass(["multiSelect"], target)){
      this.trigger("method::_setMultiSolutionToTheModel", value);
    }
  },

  _showNotification: function(){
    this.$(".notification").removeClass("show");
    this.$(".answers").removeClass("has-success")
                   .removeClass("has-error");

    if(parseInt(this.model.get("isSolved"))>0){
      this.$(".success").addClass("show");
      this.$(".answers").addClass("has-success");
    } else {
      this.$(".error").addClass("show");
      this.$(".answers").addClass("has-error");
    }
  },

  _hasOneOfClass: function(checkingClassList, target){
    let parents = target.parents();
    return _.some(checkingClassList, function(className){
      return parents.hasClass(className);
    })
  },

  /*API*/

  render: function() {
    this.$el.html(template(this.model.toJSON()));
    return this;
  },

  /*Controller*/

  _setSolutionToTheModel: function(value){
    this.model.set("userSolution",[value], {silent:true})
  },

  _setMultiSolutionToTheModel: function(value){
    let userSolution = this.model.get("userSolution");
    if(_.indexOf(userSolution, value)>-1){
      userSolution = _.without(userSolution, value)
    }else{
      userSolution.push(value)
    }

    this.model.set("userSolution", userSolution, {silent:true})
  }
}).extend(displayMixin);

