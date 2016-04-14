"use strict";
let _ =require("underscore");
let testData = {
  id:"",
  duration: 60,// in seconds
  href: "",
  tasks:[
    {
      number: 1,
      taskType:"string",
      taskName : "Some name#1",
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
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
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
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
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
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
      taskDescription: "Lorem Ipsum - це текст-\"риба\", що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.",
      variantsOfSolutions: ["1", "2", "3"],
      taskSolution: [],
      isSolved: -1,
      problemSolution: [0,2],
      problemPoint: 1
    }
  ]
};

export let testService = {
  getTest: function(){
    console.log(prepareTestData());
    return prepareTestData();
  },

  checkTaskSolution: function(task){
    let checkingTask = getTask({number:task.number});
    let taskIsFailed = 0;
    let result;

    for(let i=0; i<task.taskSolution.length; i++){
      if(task.taskType === "evaluate"){
        result = eval(task.taskSolution[i]);
      }else{
        result = task.taskSolution[i]
      }

      let taskSolution = _.isNaN(parseInt(result))
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
};

function getTask(properties){
  return _.findWhere(testData.tasks, properties);
}

function prepareTestData(){
  let preparedTestData = JSON.parse(JSON.stringify(testData));

  prepareTasksData(preparedTestData);

  return preparedTestData;
}

function prepareTasksData(preparedTestData){
  preparedTestData.tasks = [];

  let toRemove = ["problemSolution", "problemPoint"];

  let tasks = testData["tasks"];
  for(let i=0;  i<tasks.length; i++){

    preparedTestData.tasks.push(_.omit(tasks[i], toRemove));
  }

  return preparedTestData;
}

