/**
 * Created by user on 31.03.16.
 */
let $ = require('jquery-untouched');
let Backbone = require('backbone');
Backbone.$ = $;

import {testService} from "../services/testService.js";
import { taskViewFabrica } from './taskViewFactory';
import { TaskModel } from '../models/TaskModel.js';

let template = require("../templates/resultPageView/resultPageViewTpl.hbs");

export let ResultPageView = Backbone.View.extend({
  className: "resultPageView",

  initialize: function (options) {
    this.model = options.model;
    this._initEvents();
  },

  events: {
    "click button": "_showTest"
  },

  _initEvents: function _initEvents() {
    this.listenTo(this.model, "change", this._modelChanged);
  },

  _showTest: function() {
    this.trigger("showTest");
  },

  _modelChanged: function() {
    this.render();
  },

  render: function render() {
    console.log(this.model.toJSON().tasks);
    this.$el.html(template({data: this.model.toJSON()}));
    return this;
  },

  isShow: function isShow() {
    if (!this.$el.css("display") && !this.$el.height() && !this.$el.width()) {
      return false;
    } else if (this.$el.css("display") && this.$el.css("display") == "none") {
      return false;
    } else if (this.$el.css("display") && this.$el.css("display") !== "none") {
      return true;
    }
  },

  show: function() {
    this.$el.show();
  },

  hide: function hide() {
    this.$el.hide();
  }

});
