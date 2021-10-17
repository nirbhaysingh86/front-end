export interface AuditStatusHistoryResponse {
  id: number;
  patientID: number;
  auditStatus: string;
  dateSet: string;
  changedBy: string;
  currentAuditor: string;
  eventDate: string;
  daysElapsed: number;
  varianceCategory: string;
  currentReviewer: string;
}

export type GetWorklistAuditStatusHistoryResponseModel = AuditStatusHistoryResponse[];
