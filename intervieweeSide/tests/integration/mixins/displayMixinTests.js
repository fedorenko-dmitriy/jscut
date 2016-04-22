"use strict";
let Backbone = require('backbone');
let displayMixin = require('../../../app/mixins/displayMixin.js');

describe("Display Mixin tests", ()=>{
  let someView;
  beforeEach(()=>{
    someView = new (Backbone.View.extend(displayMixin))();
    document.body.appendChild(someView.el);
  });

  afterEach(()=>{
    someView.$el.remove();
  });

  it("should return false if 'someView' hide state when method 'isShow' is called", ()=>{
    someView.$el.hide();
    expect(someView.isShow()).to.equal(false);
  });

  it("should return true if 'someView' show state when method 'isShow' is called", ()=>{
    someView.$el.show();
    expect(someView.isShow()).to.equal(true);
  });

  it("should add display attribute as 'block' method 'isShow' is called", ()=>{
    someView.$el.hide();
    someView.show();

    expect(someView.isShow()).to.equal(true);
  });

  it("should remove display attribute as 'block' method 'isShow' is called", ()=> {
    someView.$el.show();
    someView.hide();

    expect(someView.isShow()).to.equal(false);
  });
});
