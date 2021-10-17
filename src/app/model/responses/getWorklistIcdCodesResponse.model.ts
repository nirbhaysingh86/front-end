export interface IcdCodesResponse {
  id: number;
  icdCode: string;
  icdVersion: number;
  description: string;
  type: string;
  serviceDate: string;
  rank: string;
  transactionId: string;
  poa: string;
   
}

export type GetWorklistIcdCodesResponseModel = IcdCodesResponse[];
