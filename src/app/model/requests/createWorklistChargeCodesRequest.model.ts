export interface CreateWorklistChargeCodesRequestModel {
  chargeCode: string;
  revenueCode: string;
  deniedCharges: number;
  description: string;
  cptCode: string;
  nonCoveredCharges: number;
  transactionId: string;
  units: number;
  nonBilledCharges: number;
  serviceDate: string;
  charges: number;
  cost: number;
}
