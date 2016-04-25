"use strict";

import { ProblemView } from './ProblemView';

export let problemViewFactory = {
  create: function(model){
    return new ProblemView({model:model});
  }
};
