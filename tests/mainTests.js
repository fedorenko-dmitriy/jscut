"use strict";



import Foo from '../app/foo.js';

describe('ES6 Foo', function () {

  let foo;

  beforeEach(()=>{
    foo = new Foo();
  });

  it('should return Do Something when calling doSomething', ()=>{
    expect(foo.doSomething()).to.equal('Do Something');
  });

  it('22222222', ()=>{
    sinon.spy(foo, "doSomething");
    foo.doSomething();
    expect(foo.doSomething.called).to.equal(true);
  });
});
