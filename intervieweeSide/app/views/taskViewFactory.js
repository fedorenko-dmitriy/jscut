"use strict";

import { TaskView } from './TaskView';

export let taskViewFactory = {
  create: function(model){
    return new TaskView({model:model});
  }
};
