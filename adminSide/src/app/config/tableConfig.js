"use strict";
let _ = require("underscore");
let Backgrid = require("backgrid");

let tablesConfigObj;

export let tableConfig = tableConfigFunction;

function tableConfigFunction (tablesConfigData){
  prepareTableConfig(tablesConfigData);

   let tableConfigObj = {
    get: function(query){
      if(_.isUndefined(query)) {
        throw "called without name of tables block name";
      }
      else if(!_.isString(query)){
        throw "called with name of tables block name as not string";
      }
      else if(_.isUndefined(tablesConfigObj[query])){
        throw 'you request undefined tables block';
      }
      else{
        return tablesConfigObj[query];
      }
    },
    clear: function(){
      tableConfig = tableConfigFunction;
    }
  };
  return tableConfig = tableConfigObj;
}

function prepareTableConfig(tablesConfigData){
  tablesConfigData = checkTypeOfArgument(tablesConfigData);

  tablesConfigObj = {};
  _.map(tablesConfigData, function(value, key){
      tablesConfigObj[key] = addActionCells(value)
  });
}

function addActionCells(object){
  var ActionCell = Backgrid.Cell.extend({
    events: {
      'click button.edit': 'editRow',
      'click button.delete': 'deleteRow'
    },
    editRow: function(e) {
      e.preventDefault();
      this.column.trigger("edit", this.model);
    },

    deleteRow: function(e) {
      e.preventDefault();
      this.column.trigger("delete", this.model);
    },

    render: function () {
      this.$el.html('<button class="edit">Edit</button> <button class="delete">Delete</button>');
      return this;
    }
  });

  object.push({
    name: "test",
    label: "Actions",
    cell: ActionCell
  });

  return object;
}

function checkTypeOfArgument(tablesConfigData){
  if(_.isObject(tablesConfigData) && !_.isFunction(tablesConfigData)&&! _.isArray(tablesConfigData)){
    return tablesConfigData;
  }
  else if(_.isString(tablesConfigData)){
    return modifyDataToObject(tablesConfigData);
  }
  else{
    throw "should initialize with argument as JSON or Object";
  }
}

function modifyDataToObject(tablesConfigData){
  return JSON.parse(tablesConfigData);
}



