"use strict";

import { ProblemView } from './ProblemView';

import {ProblemModel} from '../models/ProblemModel.js'
import {SolutionModel} from '../models/SolutionModel.js'

export let problemViewFactory = {
  create: function(problemModel, solutionModel){
    return new ProblemView({
      problemModel:problemModel,
      solutionModel: solutionModel
    });
  }
};
