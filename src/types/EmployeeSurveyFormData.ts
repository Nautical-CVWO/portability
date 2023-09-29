import { EmployeeSurveyData } from "./survery";

export type EmployeeSurveyFormData = {
    id: number;
} & EmployeeSurveyData;


export const EmployeeSurveyFormInitialValues: EmployeeSurveyFormData = {
  id: 0,
  name: '',
  gender: '',
  education: '',
  position: '',
  performance: 0,
  communication_score: 0,
  creativity_score: 0,
  problem_solving_score: 0,
  teamwork_score: 0,
  time_management_score: 0,
  workplaceSatisfaction_score: 0,
  colleagueSatisfaction_score: 0,
  feedback: ""
};


