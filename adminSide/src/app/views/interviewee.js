"use strict";



let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let Backgrid = require("backgrid");
let Modal = require("backbone.modal");


import {appModel} from "../models/AppModel";
let config = require("../config");

export let intervieweesView = new (Backbone.View.extend({
  className: "interviewees",

  events: {
    "click button.add" : "_onAdd"
  },

  _onAdd: function(){
    console.log("add");
    retModal();

    var modalView = new (retModal());
    modalView.model = new Backbone.Model({
      nickName: "",
      level:"",
      skillType: ""
    });
    appModel.get("interviewees").add(modalView.model);
    $('.interviewees').append(modalView.render().el);
  },

  _onEdit: function(model){

    console.log("edit1");

    var modalView = new (retModal(model));
    modalView.model = model || new Backbone.Model();
    $('.interviewees').append(modalView.render().el);
  },

  _onDelete: function(model){
    model.destroy();
    console.log("delete")
  },

  render: function(){

    this.grid = new Backgrid.Grid({
      className: "table table-bordered",
      columns: config.get("tableConfig", "interviewees"),
      collection: appModel.get("interviewees")
    });

    this.grid.body.columns.on("edit", this._onEdit);
    this.grid.body.columns.on("delete", this._onDelete);

    this.$el.html('<button class="btn add">Посмотреть демо</button>');

    this.$el.append(this.grid.render().el);
    return this;
  }

}))();

function retModal(){

  let template = _.template('<div class="bbm-modal__topbar">'+
    '<h3 class="bbm-modal__title">Backbone.Modal</h3>'+
    '</div>'+
    '<div class="bbm-modal__section">'+
      '<div class="form-group">'+
        '<label for="input1">Name</label>'+
        '<input type="text" class="form-control" id="nickName" placeholder="Enter name" value="<%= nickName %>">'+
      '</div>'+

      '<div class="form-group">'+
        '<label for="input2">Level</label>'+
        '<input type="text" class="form-control" id="level" placeholder="Enter level" value="<%= level %>">'+
      '</div>'+

      '<div class="form-group">'+
        '<label for="input3">Skill</label>'+
        '<input type="text" class="form-control" id="skillType" placeholder="Enter skill type" value="<%= skillType %>">'+
      '</div>'+
    '</div>'+
    '<div class="bbm-modal__bottombar">'+
      '<a href="#" class="bbm-button bbm-cancel">close</a>'+
      '<a href="#" class="bbm-button bbm-submit">save</a>'+
    '</div>');

  return Backbone.Modal.extend({
    template: template,
    cancelEl: '.bbm-cancel',
    submitEl: '.bbm-submit',
    submit: function(){
      this.$("input").each((key, item)=>{
        this.model.set(item.id, item.value)
      });

      this.model.save();
    }
  });

}
