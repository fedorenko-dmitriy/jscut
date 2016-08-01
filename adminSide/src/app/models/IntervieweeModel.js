"use strict";

let _ = require('underscore');
let Backbone = require('backbone');
let config = require("../config");

export let IntervieweeModel = Backbone.Model.extend({
    urlRoot: config.get("urlConfig", "interviewees").crud,
    defaults: {
        nickName: "",
        level:"",
        skillType: ""
    }
});