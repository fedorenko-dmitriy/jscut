"use strict";
let $ = require('jquery-untouched');
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
    "keyup textarea": "_writeSolutionToTeModel"
  },

  _initEvents: function(){
    this.listenTo(this.model, "change", this._modelChanged);
    this.listenTo(this.model, "change:isSolved", this._showNotification);
  },

  _modelChanged: function(model, options){
    if(!options.stop){
      this.prepareData();
      this.render();
    }
  },

  _clickBtnHandler: function(){
    this.trigger("checkSolution", this.model);
  },

  _writeSolutionToTeModel: function(event){
    this.model.set("taskSolution",$(event.target).val(),{silent:true})
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

