export interface CreateViewRequestModel {
  description: string;
  isDefault: boolean;
  limits: {
    auditor: number;
    followUp: number;
    status: number;
    accountAge: number;
    hiddenRecords: number;
  };
  name: string;
}
export interface ResearchCreateViewRequestModel {
  description: string;
  isDefault: boolean;
  limits: {
    paymentStatus: number;
  };
  name: string;
}
