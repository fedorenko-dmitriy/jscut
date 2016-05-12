"use strict";
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema({
  name: String ,
  age : Number
});

schema.methods.getName = function(){
  console.log(this.get("name"));
};

var Cat = mongoose.model('Cat', schema);

var kitty = new Cat({ name: 'Zildjian' });



console.log(kitty.toString());

kitty.save(function (err, kitty, affected) {

    kitty.getName();

});
