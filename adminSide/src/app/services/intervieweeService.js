"use strict";
let $ = require("jquery-untouched");

import { baseService } from "./baseService.js"


let intervieweeService = Object.assign({}, baseService);

intervieweeService.setUrlsConfig(urls);

module.exports = intervieweeService;
