export interface RevCptResponse {
  id: number;
  revenueCode: string;
  revenueCodeDescription: string;
  transactionId: string;
  cptCode: string;
  cptCodeDescription: string;
  serviceDate: string;
  modifier1: string;
  modifier2: string;
  serviceType: string;
  physicianId: string;
  pointOfService: string;
  units: number;
  charges: number;
  deniedCharges: number;
  nonCoveredCharges: number;
  nonBilledCharges: number;
  cost: number;
}

export type GetWorklistRevCptResponseModel = RevCptResponse[];
