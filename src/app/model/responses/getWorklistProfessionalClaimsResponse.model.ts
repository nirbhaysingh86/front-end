import { ClaimDetailsResponse } from './getWorklistClaimsHistoryResponse.model';

export interface ProfessionalClaimResponse {
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

export type GetWorklistProfessionalClaimsResponseModel = ProfessionalClaimResponse[];
