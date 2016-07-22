"use strict";
module.exports = function(app){

  /*app.get("/", require("Controller").get);
  app.post("/", require().post);
  app.put("/", require().put);
  app.delete("/", require().delete);*/

  /*Interviewee access*/
  app.get("/test/:id", require("../controllers/intervieweeTestSuitesController").getByIdAllData);
  app.post("/checkSolution", require("../controllers/intervieweeSolutionsController").checkSolution);

  /*Admin && moderator access*/

  /*Interviewee*/
  app.get("/interviewees", require("../controllers/intervieweeController").getByQuery);
  app.get("/interviewee/:id", require("../controllers/intervieweeController").getById);

  app.post("/interviewees", require("../controllers/intervieweeController").post);
  app.put("/interviewee/:id", require("../controllers/intervieweeController").put);
  app.delete("/interviewee/:id", require("../controllers/intervieweeController").deleteById);

  /*IntervieweeSolution*/
  app.get("/intervieweeSolutions", require("../controllers/intervieweeSolutionsController").getByQuery);
  app.get("/intervieweeSolution/:id", require("../controllers/intervieweeSolutionsController").getById);

  app.delete("/intervieweeSolution/:id", require("../controllers/intervieweeSolutionsController").deleteById);

  /*IntervieweeTestSuite*/
  app.get("/intervieweeTestSuites", require("../controllers/intervieweeTestSuitesController").getByQuery);
  app.get("/intervieweeTestSuite/:id", require("../controllers/intervieweeTestSuitesController").getById);

  app.post("/intervieweeTestSuites", require("../controllers/intervieweeTestSuitesController").post);
  app.put("/intervieweeTestSuite/:id", require("../controllers/intervieweeTestSuitesController").put);
  app.delete("/intervieweeTestSuite/:id", require("../controllers/intervieweeTestSuitesController").deleteById);

  /*Problem*/
  app.get("/problems", require("../controllers/problemsController").getByQuery);
  app.get("/problem/:id", require("../controllers/problemsController").getById);

  app.post("/problems", require("../controllers/problemsController").post);
  app.put("/problem/:id", require("../controllers/problemsController").put);
  app.delete("/problem/:id", require("../controllers/problemsController").deleteById);

  /*TestSuite*/
  app.get("/testSuites", require("../controllers/testSuitesController").getByQuery);
  app.get("/testSuite/:id", require("../controllers/testSuitesController").getById);

  app.post("/testSuites", require("../controllers/testSuitesController").post);
  app.put("/testSuite/:id", require("../controllers/testSuitesController").put);
  app.delete("/testSuite/:id", require("../controllers/testSuitesController").deleteById);

  /*Timer*/
  app.get("/startTimer", require("../controllers/timerController").startTimer);
  app.get("/getTime", require("../controllers/timerController").getTime);
  app.get("/stopTimer", require("../controllers/timerController").stopTimer);
};

