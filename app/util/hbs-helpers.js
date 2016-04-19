/**
 * Created by user on 01.04.16.
 */
"use strict";
let Handlebars = require("hbsfy/runtime");

module.exports = {
  init: function(){

    Handlebars.registerHelper("upcase", function(s) {
      return s.toUpperCase();
    });

    /*
      {{#ifvalue variable value="hero"}}
        it matches, so do some stuff
      {{/ifvalue}}
    */

    Handlebars.registerHelper('ifvalue', function (conditional, options) {
      if (options.hash.value === conditional) {
        return options.fn(this)
      } else {
        return options.inverse(this);
      }
    });

    Handlebars.registerHelper('score', function (conditional, options) {
      let score = 0;
      let type = options.hash.type;
      conditional.forEach(function(item){
        if(type === "right" && item.isSolved === 1){
          score +=1;
        }
        else if(type === "wrong" && item.isSolved === 0){
          score +=1;
        }
        else if(type === "any" && item.isSolved === -1){
          score +=1;
        }
      });
      return score;
    });
  }
};
