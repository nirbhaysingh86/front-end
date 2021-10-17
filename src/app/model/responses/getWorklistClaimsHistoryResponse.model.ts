export interface ClaimDetailsResponse {
  id: number;
  lineNumber: number;
  date: string;
  revenueCode: string;
  hcpcsCptCode: string;
  modifier: string;
  quantity: number;
  charges: number;
  nonCoveredCharges: number;
}

export interface ClaimResponse {
  id: number;
  patientControlNumber: string;
  primaryPayer: string;
  billType: string;
  claimFrequencyType: string;
  billingDate: string;
  claimNumber: string;
  statementFromDate: string;
  statementToDate: string;
  totalCharges: number;
  totalNonCoveredCharges: number;
  patientEstAmtDue: string;
  lineCount: number;
  destinationPayer: string;
  destinationPayerResponsibility: string;
  claimDetails: ClaimDetailsResponse[];
}

export interface RemitResponse {
  id: number;
  provider: string;
  payer: string;
  billType: string;
  claimFrequencyType: string;
  effectiveDate: string;
  checkNumber: string;
  statementFromDate: string;
  statementToDate: string;
  claimStatus: string;
  claimBilledAmount: number;
  claimPaidAmount: number;
  claimLevelAdjustAmount: number;
  claimLevelDenialAmount: number;
  lineLevelAdjustAmount: number;
  lineLevelDenialAmount: number;
  lineCount: number;
  claimLevelAdjustReasonCodes: string;
  claimLevelRemarkCodes: string;
  claimNumber: string;
  remitDetails: RemitDetailsResponse[];
}

export interface RemitDetailsResponse {
  id: number;
  adjustmentReasonCodes: string;
  remarkCodes: string;
}

export interface GetWorklistClaimsHistoryResponseModel {
  claims: ClaimResponse[];
  remits: RemitResponse[];
}
