import { CreateWorklistChargeCodesRequestModel } from '../requests/createWorklistChargeCodesRequest.model';

export interface ChargeCodeResponse extends CreateWorklistChargeCodesRequestModel {
  id: number;
}

export type GetWorklistChargeCodesResponseModel = ChargeCodeResponse[];
