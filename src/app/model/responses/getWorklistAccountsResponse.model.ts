export interface WorklistAccountResponse {
  patientId: number;
  actualPatientId: string;
  values: string[];
}

export interface GetWorklistAccountsResponseModel {
  totalCount: number;
  items: WorklistAccountResponse[];
}
