"use strict";

import {BaseModel} from "../../../../src/app/models/baseModel.js"

let baseModel;

describe("Base Model Tests", ()=>{

  beforeEach(()=>{

    baseModel = new BaseModel();
    baseModel.service = {
      readById(id){
        return new Promise((resolve, reject)=>{
          setTimeout(()=>{resolve([{id}])},100);
        });
      },

      updateById(id){
        return new Promise((resolve, reject)=>{
          setTimeout(()=>{resolve({id})},100);
        });
      },

      deleteById(id){
        return new Promise((resolve, reject)=>{
          setTimeout(()=>{resolve({ok:1})},100);
        });
      }
    };
  });

  describe("method getDataFromServer", ()=>{
    checkArguments("getDataFromServer");

    it("should trigger event when array with one item object got from server and set into collection if query has id", (done)=>{
      baseModel.on("change", ()=>{
        expect(baseModel.toJSON()).to.eql({id:2});
        done()
      });
      baseModel.getDataFromServer({id:2, name: "some"});
    });
  });

  describe("method setDataToServer", ()=>{
    checkArguments("setDataToServer");

    it("should trigger event when array with one item object updated on server if query has id", (done)=>{
      baseModel.on("change", ()=>{
        expect(baseModel.toJSON()).to.eql({id:2});
        done();
      });
      baseModel.setDataToServer({id:2, name: "some"});
    });
  });

  describe("method removeDataFromServer", ()=>{
    checkArguments("removeDataFromServer");

    it("should trigger event when data removed from server and removed collection if query has id", (done)=>{
      baseModel.on("removed", (deletedModel)=>{
        expect(baseModel).to.eql(deletedModel);
        done();
      });
      baseModel.removeDataFromServer({id:2, name: "some"});
    });
  });
});

function checkArguments(methodName){
  it("should throw exception if updateData argument is undefined", function(){
    expect(()=>{baseModel[methodName]()}).to.throw("passed argument should be an Object");
  });

  it("should throw exception if passed argument is not Object", function(){
    expect(()=>{baseModel[methodName](1)}).to.throw("passed argument should be an Object");
  });

  it("should throw exception if query.id not a string or number",()=>{
    expect(()=>{baseModel[methodName]({id:[]})}).to.throw("query id should be string or number");
  });
}
