"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let Backgrid = require("backgrid");
let Modal = require("backbone.modal");


import {appModel} from "../models/AppModel";
import {IntervieweeModal} from "./modals/intervieweeModal";
import {IntervieweeModel} from "../models/IntervieweeModel.js";

let config = require("../config");

export let intervieweesView = new (Backbone.View.extend({
  className: "interviewees",

  events: {
    "click button.add" : "_onAdd"
  },

  _onAdd: function(){
    console.log("add");

    var modalView = new IntervieweeModal();
    modalView.model = new IntervieweeModel();

    $('.interviewees').append(modalView.render().el);
  },

  _onEdit: function(model){

    console.log("edit1");

    var modalView = new IntervieweeModal();
    modalView.model = model || new Backbone.Model();
    $('.interviewees').append(modalView.render().el);
  },

  _onDelete: function(model){
    model.destroy({wait:true});
    console.log("delete")
    console.log(model)
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
