"use strict";

var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    _ = require("underscore");

var testData = {
  id:"",
  duration: 60,// in seconds
  href: "",
  tasks:[
    {
      number: 1,
      taskType:"string",
      taskName : "Some name#1",
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів varraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
      variantsOfSolutions: null,
      taskSolution: [],
      isSolved: -1,
      problemSolution: ["aaa"],
      problemPoint: 1
    },
    {
      number:2,
      taskType:"evaluate",
      taskName : "Some name#2",
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів varraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
      variantsOfSolutions: null,
      taskSolution: [],
      isSolved: -1,
      problemSolution: ["bbb"],
      problemPoint: 1
    },
    {
      number: 3,
      taskType:"select",
      taskName : "Some name#3",
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів varraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
      variantsOfSolutions: ["a", "b", "c"],
      taskSolution: [],
      isSolved: -1,
      problemSolution: [1],
      problemPoint: 1
    },
    {
      number: 4,
      taskType:"multiSelect",
      taskName : "Some name#4",
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів varraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
      variantsOfSolutions: ["1", "2", "3"],
      taskSolution: [],
      isSolved: -1,
      problemSolution: [0,2],
      problemPoint: 1
    }
  ]
};


var webServer = new http.Server(function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  var urlParsed = url.parse(req.url, true);

  if(urlParsed.pathname == "/getTestData"){

    var json = JSON.stringify(prepareTestData());
    res.end(json)
  }else if(urlParsed.pathname == "/checkTaskSolution"){

    var body = '';

    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        req.connection.destroy();
    });

    req.on('end', function () {
      var task = checkTaskSolution(JSON.parse(body));

      res.end(JSON.stringify(task));
    });
  }
});

webServer.listen(8080, '127.0.0.1');
console.log("webServer started on 127.0.0.1:8080");

function checkTaskSolution (task){
  var checkingTask = getTask({number:task.number});
  var taskIsFailed = 0;
  var result;

  for(var i=0; i<task.taskSolution.length; i++){
    if(task.taskType === "evaluate"){
      try {
        result = eval(task.taskSolution[i]);
      } catch (e) {
        result = false;
      }
    }else{
      result = task.taskSolution[i]
    }

    var taskSolution = _.isNaN(parseInt(result))
      ? result
      : parseInt(result);

    if(checkingTask.problemSolution.indexOf(taskSolution) > -1){
      taskIsFailed += 1;
    }else{
      taskIsFailed = 0;
      break;
    }
  }

  if(task.taskSolution.length && taskIsFailed === checkingTask.problemSolution.length){
    task.isSolved = checkingTask.problemPoint;
  } else {
    task.isSolved = 0;
  }
  return task;
}

function getTask(properties){
  return _.findWhere(testData.tasks, properties);
}

function prepareTestData(){
  var preparedTestData = JSON.parse(JSON.stringify(testData));

  prepareTasksData(preparedTestData);

  return preparedTestData;
}

function prepareTasksData(preparedTestData){
  preparedTestData.tasks = [];

  var toRemove = ["problemSolution", "problemPoint"];

  var tasks = testData["tasks"];
  for(var i=0;  i<tasks.length; i++){

    preparedTestData.tasks.push(_.omit(tasks[i], toRemove));
  }

  return preparedTestData;
}
