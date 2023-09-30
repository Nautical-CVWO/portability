import { EmployeeSurveyData } from "./survery";

export type EmployeeSurveyFormData = {
  id: number;
  email: string;
  password: string;
} & EmployeeSurveyData;

export type EmployeeLoginData = {
  email: string;
  password: string;
};

export type EmployeeCertData = {
  certUrl: string;
};

export const EmployeeSurveyFormInitialValues: EmployeeSurveyFormData = {
  email: "",
  password: "",
  id: 0,
  name: "",
  gender: "",
  education: "",
  position: "",
  performance: 0,
  communication: 0,
  creativity: 0,
  problem_solving: 0,
  teamwork: 0,
  time_management: 0,
  workplaceSatisfaction: 0,
  colleagueSatisfaction: 0,
  feedback: "",
  skillsReview: "",
};

export const EmployeeLoginInitialValues: EmployeeLoginData = {
  email: "",
  password: "",
};

export const EmployeeCertInitialValues: EmployeeCertData = {
  certUrl: ""
};
