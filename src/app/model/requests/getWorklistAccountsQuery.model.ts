export interface GetWorklistAccountsQueryModel {
  viewId: number;
  auditor: number;
  followUp: number;
  status: number;
  accountAge: number;
  hiddenRecords: number;
  sortBy?: string;
  sortOrder?: 'Asc' | 'Desc';
  offset?: number;
  limit?: number;
  layoutId?: number;
}
