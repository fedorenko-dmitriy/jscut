"use strict";

import { TaskView } from './TaskView';
import { TaskModel } from '../models/TaskModel.js';

export let taskViewFactory = {
  create: function(tasks){
    let model = new TaskModel(tasks);
    return new TaskView({model:model});
  }
};
