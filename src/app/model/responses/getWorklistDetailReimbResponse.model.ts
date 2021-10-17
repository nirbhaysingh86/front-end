export interface DetailReimbResponse {
  id: number;
  codeType: string;
  serviceType: string;
  item: string;
  servicePayOrGroup: string;
  serviceDate: string;
  adjustedCharges: string;
  units: number;
  reimbMethod: string;
  ppc: string;
  rate: string;
  expectedReimburse: number;
  termsDiff: number;
  
}

export type GetWorklistDetailReimbResponseModel = DetailReimbResponse[];
