"use strict";
module.exports = function(app){

  /*app.get("/", require("").get);
  app.post("/", require().post);
  app.put("/", require().put);
  app.delete("/", require().delete);*/

  /*Interviewee access*/
  app.get("/test/:id", require("./intervieweeTestSuites").getByIdAllData);
  app.post("/checkSolution", require("./intervieweeSolutions").checkSolution);

  /*Admin && moderator access*/

  /*Interviewee*/
  app.get("/interviewees", require("./interviewee").getByQuery);
  app.get("/interviewee/:id", require("./interviewee").getById);

  app.post("/interviewees", require("./interviewee").post);
  app.put("/interviewee/:id", require("./interviewee").put);
  app.delete("/interviewee/:id", require("./interviewee").deleteById);

  /*IntervieweeSolution*/
  app.get("/intervieweeSolutions", require("./intervieweeSolutions").getByQuery);
  app.get("/intervieweeSolution/:id", require("./intervieweeSolutions").getById);

  app.delete("/intervieweeSolutions/:id", require("./intervieweeSolutions").deleteById);

  /*IntervieweeTestSuite*/
  app.get("/intervieweeTestSuites", require("./intervieweeTestSuites").getByQuery);
  app.get("/intervieweeTestSuite/:id", require("./intervieweeTestSuites").getById);

  app.post("/intervieweeTestSuite", require("./intervieweeTestSuites").post);
  app.put("/intervieweeTestSuite/:id", require("./intervieweeTestSuites").put);
  app.delete("/intervieweeTestSuite/:id", require("./intervieweeTestSuites").deleteById);

  /*Problem*/
  app.get("/problems", require("./problems").getByQuery);
  app.get("/problem/:id", require("./problems").getById);

  app.post("/problems", require("./problems").post);
  app.put("/problem/:id", require("./problems").put);
  app.delete("/problem/:id", require("./problems").deleteById);

  /*TestSuite*/
  app.get("/testSuites", require("./testSuites").getByQuery);
  app.get("/testSuite/:id", require("./testSuites").getById);

  app.post("/testSuites", require("./testSuites").post);
  app.put("/testSuite/:id", require("./testSuites").put);
  app.delete("/testSuite/:id", require("./testSuites").deleteById);

  /*Timer*/
  app.get("/startTimer", require("./timer").startTimer);
  app.get("/getTime", require("./timer").getTime);
  app.get("/stopTimer", require("./timer").stopTimer);
};

