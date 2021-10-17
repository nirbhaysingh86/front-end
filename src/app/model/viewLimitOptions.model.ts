import { SystemValueModel } from './systemValue.model';

export interface ViewLimitOptionsModel {
  auditor: SystemValueModel[];
  followUp: SystemValueModel[];
  status: SystemValueModel[];
  accountAge: SystemValueModel[];
  hiddenRecords: SystemValueModel[];
  

}
export interface ResearchViewLimitOptionsModel {
  
  paymentStatus: SystemValueModel[];

}
