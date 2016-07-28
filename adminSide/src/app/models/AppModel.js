"use strict";

let _ = require("underscore");
let Backbone = require("backbone");

// There we should be get all jsonData from server which we need to render page

import {intervieweesCollection} from "../collections/interviewees.js";
import {intervieweeSolutionsCollection} from "../collections/intervieweeSolutions.js";
import {intervieweeTestSuitesCollection} from "../collections/intervieweeTestSuites.js";
import {problemsCollection} from "../collections/problems.js";
import {testSuitesCollection} from "../collections/testSuites.js";

let AppModel = Backbone.Model.extend({

});

export let appModel = new AppModel({
  interviewees : intervieweesCollection,
  intervieweeSolutions : intervieweeSolutionsCollection,
  intervieweeTestSuites : intervieweeTestSuitesCollection,
  problems : problemsCollection,
  testSuites : testSuitesCollection
});
