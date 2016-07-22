"use strict";

var expect = require('chai').expect;
var request = require('request');
var _ = require("underscore");

var intervieweesData = require("./mocks/interviewees.json");
var intervieweeSolutionsData = require("./mocks/intervieweeSolutions.json");
var intervieweeTestSuitesData = require("./mocks/intervieweeTestSuites.json");
var problemsData = require("./mocks/problems.json");
var testSuitesData = require("./mocks/testSuites.json");

    var server = require('./mocks/createTestServer.js');

  describe("Router Integration Tests", function(){
    before(function(done){
      server.listen();
      require('./mocks/createTestDB.js')(done)
    });

    after(function(){
      server.close();
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////__D_a_t_a__I_n_t_e_r_v_i_e_w_e_e__////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe("route '/test/:id' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        })
      });

      it("should return array with only one item as object", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        });
      });

      it("should return array without objects which have property started _ or __", function(done){
        console.log("a")
        request.get("http://localhost:8081/test/2", function(err, res, body){
          var result = JSON.parse(res.body);
          var checkResult = _.filter(result[0], function(item, key){
            if(key.charAt(0) === "_"){
              return key;
            }
          });
          expect(checkResult).to.have.length(0);
          done();
        });
      });

      it("should return array with object which has id as integer", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.be.a("number");
          done();
        });
      });

      it("should return array with object which has interviewee as object", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].interviewee).not.to.be.instanceof(Array);
          expect(result[0].interviewee).to.be.instanceof(Object);
          done();
        });
      });

      it("should return array with object which has interviewee as object is not empty", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].interviewee).not.to.be.empty;
          done();
        });
      });

      it("should return array with object which has testSuite as object", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].testSuite).not.to.be.instanceof(Array);
          expect(result[0].testSuite).to.be.instanceof(Object);
          done();
        });
      });

      it("should return array with object which has testSuite as object is not empty", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].testSuite).not.to.be.empty;
          done();
        });
      });

      it("should return array with pbject which has solutions as array", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].solutions).to.be.instanceof(Array);
          done();
        });
      });

      it("should return array with object which has solutions as array is empty when load at first", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].solutions).to.be.empty;
          done();
        });
      });

      it("should return array with pbject which has problem as array", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].problems).to.be.instanceof(Array);
          done();
        });
      });

      it("should return array with object which has solutions as array is not empty", function(done){
        request.get("http://localhost:8081/test/1", function(err, res, body){
          var result = JSON.parse(res.body);
          console.log(result)
          expect(result[0].problems).not.to.be.empty;
          done();
        });
      });
    });

    describe("route '/checkSolution' method POST", function(){
      it("should return object", function(done){
        request.post("http://localhost:8081/checkSolution", {form: intervieweeSolutionsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.eql(intervieweeSolutionsData[0]);
          done();
        });
      });

      it("should return object with the sames keys and values except isSolved value", function(done){
        request.post("http://localhost:8081/checkSolution", {form: intervieweeSolutionsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(_.omit(result, "isSolved")).to.eql(_.omit(intervieweeSolutionsData[0], "isSolved"));
          done();
        });
      });

      it("should return object with isSolved value equals 0 if solution wrong", function(done){
        intervieweeSolutionsData[0].solution.push(12);

        request.post("http://localhost:8081/checkSolution", {form: intervieweeSolutionsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.isSolved).to.equal(0);
          done();
        });
      });

      it("should return object with isSolved value equals 1 if solution success", function(done){
        request.post("http://localhost:8081/checkSolution", {form: intervieweeSolutionsData[1]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.isSolved).to.equal(1);
          done();
        });
      });
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////__I_n_t_e_r_v_i_e_w_e_e__//////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    describe("route '/interviewees' method GET", function(){
      it("should return array length more then one item", function(done){
        request.get("http://localhost:8081/interviewees", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length.above(0);
          done();
        })
      });

      it("should return array with objects which have property _id", function(done){
        request.get("http://localhost:8081/interviewees", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0]._id).to.exist;
          done();
        })
      });

      it("should return array with objects which equal array", function(done){
        request.get("http://localhost:8081/interviewees", function(err, res, body){
          var result = JSON.parse(res.body);
          result = _.map(result, function(item){
            return _.omit(item, '_id', '__v')
          });

          expect(result).to.eql(intervieweesData);
          done();
        })
      });
    });

    describe("route '/interviewees?query' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/interviewees?nickName=John", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        })
      });

      it("should return array which consist one object", function(done){
        request.get("http://localhost:8081/interviewees?nickName=John", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        })
      });

      it("should return array which consist one object with property 'nickName'", function(done){
        request.get("http://localhost:8081/interviewees?nickName=John", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].nickName).to.eql("John");
          done();
        })
      });
    });

    describe("route '/interviewee/:id' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/interviewee/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should return array which has only one object", function(done){
        request.get("http://localhost:8081/interviewee/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        });
      });

      it("should return array", function(done){
        request.get("http://localhost:8081/interviewee/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(1);
          done();
        });
      });
    });

    describe("route '/interviewees' method POST", function(){
      it("should add data to DB and return array", function(done){
        intervieweesData[0].id = 4;
        request.post("http://localhost:8081/interviewees", {form:intervieweesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should add data to DB and return array with object with property id", function(done){
        intervieweesData[0].id = 5;
        request.post("http://localhost:8081/interviewees", {form:intervieweesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(5);
          done();
        });
      });
    });

    describe("route '/interviewee/:id' method PUT", function(){
      it("should update data to and DB return object", function(done){
        intervieweesData[0].nickName = "Bob";
        request.put("http://localhost:8081/interviewee/"+intervieweesData[0].id, {form:intervieweesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Object);
          expect(result).not.to.be.instanceof(Array);
          done();
        });
      });

      it("should update data to and DB return object and nickName is changed to 'Mike'", function(done){
        intervieweesData[0].nickName = "Mike";
        request.put("http://localhost:8081/interviewee/"+intervieweesData[0].id, {form:intervieweesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.nickName).to.equal("Mike");
          done();
        });
      });
    });

    describe("route '/interviewee/:id' method DELETE", function(){
      it("should return object with property ok && n", function(done){
        request.delete("http://localhost:8081/interviewee/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.ok).to.equal(1);
          expect(result.n).to.equal(1);
          done();
        });
      });
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////__I_n_t_e_r_v_i_e_w_e_e__S_o_l_u_t_i_o_n__/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe("route '/intervieweeSolutions'  method GET", function(){
      it("should return array length more then one item", function(done){
        request.get("http://localhost:8081/intervieweeSolutions", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length.above(0);
          done();
        })
      });

      it("should return array with objects which have property _id", function(done){
        request.get("http://localhost:8081/intervieweeSolutions", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0]._id).to.exist;
          done();
        })
      });

      it("should return array with objects which equal array", function(done){
        request.get("http://localhost:8081/intervieweeSolutions", function(err, res, body){
          var result = JSON.parse(res.body);
          result = _.map(result, function(item){
            return _.omit(item, '_id', '__v')
          });
          intervieweeSolutionsData[1].isSolved = 1;
          expect(result).to.eql(intervieweeSolutionsData);
          done();
        })
      });
    });

    describe("route '/intervieweeSolution/:id' method GET", function(){
      //ToDo behaviour not implement...
    });

    describe("route '/intervieweeSolutions?query' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/intervieweeSolutions?interviewee_id=1&problem_id=2&testSuite_id=2", function(err, res, body){

          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        })
      });

      it("should return array which consist one object", function(done){
        request.get("http://localhost:8081/intervieweeSolutions?interviewee_id=1&problem_id=2&testSuite_id=2", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        })
      });

      it("should return array which consist one object with property 'nickName'", function(done){
        request.get("http://localhost:8081/intervieweeSolutions?interviewee_id=1&problem_id=2&testSuite_id=2", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].testSuite_id).to.eql(2);
          done();
        })
      });
    });

    describe("route '/intervieweeSolution/:id' method DELETE", function(){
      //ToDo behaviour not implement...
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////__I_n_t_e_r_v_i_e_w_e_e__T_e_s_t_S_u_i_t_e__////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      describe("route '/intervieweeTestSuites' method GET", function(){
        it("should return array length more then one item", function(done){
          request.get("http://localhost:8081/intervieweeTestSuites", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result).to.have.length(2);
            done();
          })
        });

        it("should return array with objects which have property _id", function(done){
          request.get("http://localhost:8081/intervieweeTestSuites", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result[0]._id).to.exist;
            done();
          })
        });

        it("should return array with objects which equal array", function(done){
          request.get("http://localhost:8081/intervieweeTestSuites", function(err, res, body){
            var result = JSON.parse(res.body);

            result = _.map(result, function(item){
              return _.omit(item, '_id', '__v')
            });

            expect(result).to.eql(intervieweeTestSuitesData);
            done();
          })
        });
      });

    describe("route '/intervieweeTestSuites?query' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/intervieweeTestSuites?interviewee_id=1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        })
      });

      it("should return array which consist one object", function(done){
        request.get("http://localhost:8081/intervieweeTestSuites?testSuite_id=1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        })
      });

      it("should return array which consist one object with property 'nickName'", function(done){
        request.get("http://localhost:8081/intervieweeTestSuites?interviewee_id=1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].testSuite_id).to.eql(1);
          done();
        })
      });
    });

    describe("route '/intervieweeTestSuite/:id' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/intervieweeTestSuite/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should return array which has only one object", function(done){
        request.get("http://localhost:8081/intervieweeTestSuite/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        });
      });

      it("should return array", function(done){
        request.get("http://localhost:8081/intervieweeTestSuite/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(1);
          done();
        });
      });
    });

    describe("route '/intervieweeTestSuite' method POST", function(){
      it("should add data to DB and return array", function(done){
        intervieweesData[0].id = 4;
        request.post("http://localhost:8081/intervieweeTestSuites", {form:intervieweesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should add data to DB and return array with object with property id", function(done){
        intervieweesData[0].id = 5;
        request.post("http://localhost:8081/intervieweeTestSuites", {form:intervieweesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(5);
          done();
        });
      });
    });

    describe("route '/intervieweeTestSuite/:id' method PUT", function(){
      it("should update data to and DB return object", function(done){
        intervieweeTestSuitesData[0].interviewee_id = 3;
        request.put("http://localhost:8081/intervieweeTestSuite/"+intervieweeTestSuitesData[0].id, {form:intervieweeTestSuitesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Object);
          expect(result).not.to.be.instanceof(Array);
          done();
        });
      });

      it("should update data to and DB return object and intreviewee_id is changed to 5", function(done){
        intervieweeTestSuitesData[0].interviewee_id = 5;
        request.put("http://localhost:8081/intervieweeTestSuite/"+intervieweeTestSuitesData[0].id, {form:intervieweeTestSuitesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.interviewee_id).to.equal(5);
          done();
        });
      });
    });

    describe("route '/intervieweeTestSuite/:id' method DELETE", function(){
      it("should return object with property ok && n", function(done){
        request.delete("http://localhost:8081/intervieweeTestSuite/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.ok).to.equal(1);
          expect(result.n).to.equal(1);
          done();
        });
      });
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////__P_R_O_B_L_E_M__//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      describe("route '/problems' method GET", function(){
        it("should return array length more then one item", function(done){
          request.get("http://localhost:8081/problems", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result).to.have.length(4);
            done();
          })
        });

        it("should return array with objects which have property _id", function(done){
          request.get("http://localhost:8081/problems", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result[0]._id).to.exist;
            done();
          })
        });

        it("should return array with objects which equal array", function(done){
          request.get("http://localhost:8081/problems", function(err, res, body){
            var result = JSON.parse(res.body);
            result = _.map(result, function(item){
              return _.omit(item, '_id', '__v')
            });

            expect(result).to.eql(problemsData);
            done();
          })
        });
      });


      describe("route '/problems?query' method GET", function(){
        it("should return array", function(done){
          request.get("http://localhost:8081/problems?id=1", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result).to.be.instanceof(Array);
            done();
          })
        });

        it("should return array which consist one object", function(done){
          request.get("http://localhost:8081/problems?id=1", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result).to.have.length(1);
            done();
          })
        });

        it("should return array which consist one object with property 'nickName'", function(done){
          request.get("http://localhost:8081/problems?id=1", function(err, res, body){
            var result = JSON.parse(res.body);
            expect(result[0].name).to.eql("Some name#1");
            done();
          })
        });
      });

    describe("route '/problem/:id' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/problem/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should return array which has only one object", function(done){
        request.get("http://localhost:8081/problem/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        });
      });

      it("should return array", function(done){
        request.get("http://localhost:8081/problem/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(1);
          done();
        });
      });
    });

    describe("route '/problem' method POST", function(){
      it("should add data to DB and return array", function(done){
        problemsData[0].id = 5;
        request.post("http://localhost:8081/problems", {form:problemsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should add data to DB and return array with object with property id", function(done){
        problemsData[0].id = 6;
        request.post("http://localhost:8081/problems", {form:problemsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(6);
          done();
        });
      });
    });

    describe("route '/problem/:id' method PUT", function(){
      it("should update data to and DB return object", function(done){
        problemsData[0].name = "new problem";
        request.put("http://localhost:8081/problem/"+problemsData[0].id, {form:problemsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Object);
          expect(result).not.to.be.instanceof(Array);
          done();
        });
      });

      it("should update data to and DB return object and nickName is changed to 'Mike'", function(done){
        problemsData[0].name = "newest problem";
        request.put("http://localhost:8081/problem/"+problemsData[0].id, {form:problemsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.name).to.equal("newest problem");
          done();
        });
      });
    });

    describe("route '/problem/:id' method DELETE", function(){
      it("should return object with property ok && n", function(done){
        request.delete("http://localhost:8081/problem/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.ok).to.equal(1);
          expect(result.n).to.equal(1);
          done();
        });
      });
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////__T_E_S_T__S_U_I_T_E__/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe("route '/testSuites' method GET", function(){
      it("should return array length more then one item", function(done){
        request.get("http://localhost:8081/testSuites", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(4);
          done();
        })
      });

      it("should return array with objects which have property _id", function(done){
        request.get("http://localhost:8081/testSuites", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0]._id).to.exist;
          done();
        })
      });

      it("should return array with objects which equal array", function(done){
        request.get("http://localhost:8081/testSuites", function(err, res, body){
          var result = JSON.parse(res.body);
          result = _.map(result, function(item){
            return _.omit(item, '_id', '__v')
          });
          console.log("result");
          console.log(result);
          expect(result).to.eql(testSuitesData);
          done();
        })
      });
    });

    describe("route '/testSuites?query' method GET", function(){
      it("should return array", function(done){
        request.get("http://localhost:8081/testSuites?name=AAAA", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        })
      });

      it("should return array which consist one object", function(done){
        request.get("http://localhost:8081/testSuites?name=AAAA", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.have.length(1);
          done();
        })
      });

      it("should return array which consist one object with property 'name'", function(done){
        request.get("http://localhost:8081/testSuites?name=AAAA", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].name).to.eql("AAAA");
          done();
        })
      });
    });

    describe("route '/testSuites' method POST", function(){
      it("should add data to DB and return array", function(done){
        problemsData[0].id = 5;
        request.post("http://localhost:8081/testSuites", {form:problemsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Array);
          done();
        });
      });

      it("should add data to DB and return array with object with property id", function(done){
        problemsData[0].id = 6;
        request.post("http://localhost:8081/testSuites", {form:problemsData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result[0].id).to.equal(6);
          done();
        });
      });
    });

    describe("route '/testSuite/:id' method PUT", function(){
      it("should update data to and DB return object", function(done){
        testSuitesData[0].name = "GGGG";
        request.put("http://localhost:8081/testSuite/"+testSuitesData[0].id, {form:testSuitesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result).to.be.instanceof(Object);
          expect(result).not.to.be.instanceof(Array);
          done();
        });
      });

      it("should update data to and DB return object and nickName is changed to 'Mike'", function(done){
        testSuitesData[0].name = "MMMM";
        request.put("http://localhost:8081/testSuite/"+testSuitesData[0].id, {form:testSuitesData[0]}, function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.name).to.equal("MMMM");
          done();
        });
      });
    });

    describe("route '/testSuite/:id' method DELETE", function(){
      it("should return object with property ok && n", function(done){
        request.delete("http://localhost:8081/testSuite/1", function(err, res, body){
          var result = JSON.parse(res.body);
          expect(result.ok).to.equal(1);
          expect(result.n).to.equal(1);
          done();
        });
      });
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////__T_I_M_E_R__///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe("route '/startTimer' method GET", function(){
      it("should return object with absoluteTime equals 0", function(done){
        request.get("http://localhost:8081/startTimer", function(err, res, body){
          console.log(res.body);
          var result = JSON.parse(res.body);
          expect(result.absoluteTime).to.equal(0);
          done();
        });
      });

      it("should return object with remainingTime equals 20000", function(done){
        request.get("http://localhost:8081/startTimer", function(err, res, body){
          console.log(res.body);
          var result = JSON.parse(res.body);
          expect(result.remainingTime).to.equal(20000);
          done();
        });
      });
    });

    describe("route '/getTime' method GET", function(){
      it("should return object with absoluteTime equals 0", function(done){
        request.get("http://localhost:8081/startTimer", function() {
          setTimeout(function(){
            request.get("http://localhost:8081/getTime", function(err, res, body) {
              console.log(res.body);
              var result = JSON.parse(res.body);
              expect(result.absoluteTime).to.be.above(0);
              done();
            });
          }, 1000);
        });
      });

      it("should return object with remainingTime equals 20000", function(done){
        request.get("http://localhost:8081/startTimer", function() {
          setTimeout(function(){
            request.get("http://localhost:8081/getTime", function(err, res, body) {
              console.log(res.body);
              var result = JSON.parse(res.body);
              expect(result.remainingTime).to.be.below(20000);
              done();
            });
          }, 1000)
        });
      });
    });

    describe("route '/stopTimer' method GET", function(){
      it("should return object with absoluteTime equals 0", function(done){
        request.get("http://localhost:8081/startTimer", function() {
          setTimeout(function(){
            request.get("http://localhost:8081/stopTimer", function(err, res, body) {
              console.log("res.body");
              console.log(res.body);
              var result = JSON.parse(res.body);
              expect(result.absoluteTime).to.be.above(0);
              done();
            });
          }, 1000);
        });
      });

      it("should return object with remainingTime equals 20000", function(done){
        request.get("http://localhost:8081/startTimer", function() {
          setTimeout(function(){
            request.get("http://localhost:8081/stopTimer", function(err, res, body) {
              console.log(res.body);
              var result = JSON.parse(res.body);
              expect(result.remainingTime).to.be.below(20000);
              done();
            });
          }, 1000)
        });
      });

      it("should return object with testIsEnded true", function(done){
        request.get("http://localhost:8081/startTimer", function() {
          setTimeout(function(){
            request.get("http://localhost:8081/stopTimer", function(err, res, body) {
              console.log(res.body);
              var result = JSON.parse(res.body);
              expect(result.testIsEnded).to.equal(true);
              done();
            });
          }, 1000)
        });
      });
    });
  }
);

