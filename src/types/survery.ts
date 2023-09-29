export interface EmployeeSurveyPostData {
    [id: number]:  EmployeeSurveyData;
}

export interface EmployeeSurveyData {
    id: number,
    name: string,
    gender: string,
    education: string,
    position: string,
    performance: number
    communication_score: number,
    creativity_score: number,
    problem_solving_score: number,
    teamwork_score: number,
    time_management_score: number,
    workplaceSatisfaction_score: number,
    colleagueSatisfaction_score: number,
    feedback: string
}



