"use strict";

var _ = require('underscore');
var opts = require('optimist').argv;
var fs = require('fs');
var consoleTable = require("console.table");


var intervieweeModel = require("./models/intervieweeModel");
var intervieweeSolutionModel = require("./models/intervieweeSolutionModel");
var intervieweeTestSuiteModel = require("./models/intervieweeTestSuiteModel");
var problemModel = require("./models/problemModel");
var testSuiteModel = require("./models/testSuiteModel");

// create row
// get row
// update row
// delete row
// drop table
// drop db -- optional

// node ./testSuiteAppCMD 'module name' 'action' 'param'
// param types
//  -nameColumn value (uses with CRUD of tables)
//  -path 'pathString' (uses when create and fill up a table)
//  -table 'tableName'



// get params

var table;
var moduleName = opts._[0];
var actionName = opts._[1];
var param = opts.param;
var path = opts.path;

// switch case
var module;
var action;


switch(moduleName){
  case 'interviewee': module = intervieweeModel; break;
  case 'intervieweeSolution': module = intervieweeSolutionModel; break;
  case 'intervieweeTestSuite': module = intervieweeTestSuiteModel; break;
  case 'problem': module = problemModel; break;
  case 'testSuite': module = testSuiteModel; break;
  default : throw 'this module is undefined'; break;
}

switch (actionName){
  case 'set': action = 'create'; break;
  case 'get': action = 'read'; break;

  case 'update': action = 'update'; break;
  case 'delete': action = 'remove'; break;

  case 'createCollection': action = 'create'; break;
  case 'dropCollection': action = 'drop'; break;
}

if(path){
  var filePath = "/media/user/web_drive/PROJECT/JSCUT/serverSide/app/public/"+opts.path;

  fs.readFile(filePath, function(err, content){
    if(err) throw err;
    param = JSON.parse(content);
    executeModuleMethod(param);
  });
}else{
  if(!param && actionName !=="get"){
    console.log("params must be defined")
  }
  param = param || {};
  executeModuleMethod(param);
}


function executeModuleMethod(param){
  param = param || "";

  module[action](function(err, result){
    if(err) console.log(err);

    console.log("Module "+moduleName+" do "+actionName+" successful");
    var modResult = [];
    if(result){
      if(result.toObject){
        modResult = result.toObject();
      }else if(result[0].toObject){
        _.each(result, function(item){
          modResult.push(item.toObject());
        });
      }else{
        modResult = result;
      }
    }
  },param);
}

