"use strict";

let displayMixin = require('/displayMixin');

describe("Display Mixin tests", ()=>{
  it("should return false if 'resultPageView' hide state when method 'isShow' is called", ()=>{
    resultPageView.$el.hide();
    expect(resultPageView.isShow()).to.equal(false);
  });

  it("should return true if 'resultPageView' show state when method 'isShow' is called", ()=>{
    resultPageView.$el.show();
    expect(resultPageView.isShow()).to.equal(true);
  });

  it("should add display attribute as 'block' method 'isShow' is called", ()=>{
    resultPageView.$el.hide();
    resultPageView.show();

    expect(resultPageView.isShow()).to.equal(true);
  });

  it("should remove display attribute as 'block' method 'isShow' is called", ()=>{
    resultPageView.$el.show();
    resultPageView.hide();

    expect(resultPageView.isShow()).to.equal(false);
})
