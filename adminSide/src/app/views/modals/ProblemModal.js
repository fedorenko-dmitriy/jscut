"use strict";
let $ = require('jquery-untouched');
let _ = require('underscore');
let Backbone = require('backbone');
Backbone.$ = $;

import {appModel} from "../../models/AppModel";
let tmpl = require("../../templates/modals/problemModalTpl.html");

let Modal = require("backbone.modal");

let template = _.template(tmpl);

export let ProblemModal = Backbone.Modal.extend({
  template: template,
  cancelEl: '.bbm-cancel',
  submitEl: '.bbm-submit',
  submit: function(){
    var attr = {};
    this.$("input").each((key, item)=>{
      attr[item.id] = item.value
    });

    this.model.save(attr, {
      success: function(){
        appModel.get("problems").fetch();
      }
    });
  },
  cancel: function(){
    if(!this.model.id){
      this.model.destroy();
    }
  }
});
