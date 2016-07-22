"use strict";

import {BaseCollection} from "../../../../src/app/collections/BaseCollection.js"

describe("Base Collection Tests", ()=>{
  let baseCollection;
  beforeEach(()=>{

    baseCollection = new BaseCollection();
    baseCollection.service = {
      readByQuery(query){
        return new Promise((resolve, reject)=>{
          setTimeout(()=>{resolve([{query, "aaa":"aaa"}])},100);
        });
      }
    };
  });

  describe.only("method getDataFromServer", ()=>{
    it("should throw exception if query argument is not Object", function(){
      expect(()=>{baseCollection.getDataFromServer(1)}).to.throw("passed query should be an Object");
    });

    it("should trigger event when array with one or more item object got from server and set into collection if query undefined", (done)=>{
      baseCollection.listenTo(baseCollection, "add", ()=>{
        expect(baseCollection.toJSON()).to.have.lengthOf(1);
        done()
      });
      baseCollection.getDataFromServer();
    });

    it("should trigger event when array with one or more item object got from server and set into collection if query hasn't id", (done)=>{
      baseCollection.listenTo(baseCollection, "add", ()=>{
        expect(baseCollection.toJSON()).to.have.lengthOf(1);
        done()
      });
      baseCollection.getDataFromServer({name: "some"});
    });
  });

});
