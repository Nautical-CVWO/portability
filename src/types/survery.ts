export interface EmployeeSurveyPostData {
  [id: number]: EmployeeSurveyData;
}

export interface EmployeeSurveyData {
  id: number;
  name: string;
  gender: string;
  education: string;
  position: string;
  performance: number;
  communication: number;
  creativity: number;
  problem_solving: number;
  teamwork: number;
  time_management: number;
  workplaceSatisfaction: number;
  colleagueSatisfaction: number;
  feedback: string;
  skillsReview: string;
}
