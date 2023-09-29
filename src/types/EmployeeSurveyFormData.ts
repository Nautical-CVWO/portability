import { EmployeeSurveyData } from "./survery";

export type EmployeeSurveyFormData = {
    id: number;
} & EmployeeSurveyData;


export const EmployeeSurveyFormInitialValues: EmployeeSurveyFormData = {
  id: 0,
  name: "",
  gender: '',
  education: '',
  position: '',
  performance: 0,
  communication: 0,
  creativity: 0,
  problem_solving: 0,
  teamwork: 0,
  time_management: 0,
  workplaceSatisfaction: 0,
  colleagueSatisfaction: 0,
  feedback: ""
};


