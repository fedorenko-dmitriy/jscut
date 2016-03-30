"use strict";

import { TaskView } from './TaskView';

export let taskViewFabrica = {
  create: function(model){
    return new TaskView(model);
  }
};
