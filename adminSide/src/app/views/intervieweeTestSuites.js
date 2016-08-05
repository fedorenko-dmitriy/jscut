"use strict";

let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

let Backgrid = require("backgrid");
require("backgrid-paginator");
let Modal = require("backbone.modal");

let displayMixin = require('../mixins/displayMixin');

import {appModel} from "../models/AppModel";
import {IntervieweeTestSuiteModal} from "./modals/IntervieweeTestSuiteModal.js";
import {IntervieweeTestSuiteModel} from "../models/IntervieweeTestSuiteModel.js";

let template = _.template(require("../templates/pages/intervieweeTestSuitesPageTpl.html"));

let config = require("../config");

export let intervieweeTestSuitesView = new (Backbone.View.extend({
  className: "intervieweeTestSuites",

  events: {
    "click button.add" : "_onAdd"
  },

  _onAdd: function(){
    console.log("add");
    intervieweeTestSuitesView._openModal();
  },

  _onEdit: function(model){
    console.log("edit");
    intervieweeTestSuitesView._openModal(model);
  },

  _onDelete: function(model){
    console.log("delete");

    model.destroy({wait:true});
    console.log(model);
  },
  _openModal: function(model){

    var modalView = new IntervieweeTestSuiteModal();
    modalView.model = model ? model : new IntervieweeTestSuiteModel();
    this.$el.append(modalView.render().el);
  },

  render: function(){

    this.grid = new Backgrid.Grid({
      className: "table table-bordered",
      columns: config.get("tableConfig", "intervieweeSolutions"),
      collection: appModel.get("intervieweeTestSuites")
    });

    this.grid.body.columns.on("edit", this._onEdit);
    this.grid.body.columns.on("delete", this._onDelete);

    this.$el.html(template);

    this.$el.append(this.grid.render().el);

    this.renderPaginator();

    return this;
  },

  renderPaginator: function(){
    var paginator = new Backgrid.Extension.Paginator({

      // If you anticipate a large number of pages, you can adjust
      // the number of page handles to show. The sliding window
      // will automatically show the next set of page handles when
      // you click next at the end of a window.
      windowSize: 20, // Default is 10

      // Used to multiple windowSize to yield a number of pages to slide,
      // in the case the number is 5
      slideScale: 0.25, // Default is 0.5

      // Whether sorting should go back to the first page
      goBackFirstOnSort: false, // Default is true

      collection: appModel.get("intervieweeTestSuites")
    });

    this.$el.append(paginator.render().el);
  }

}))();



