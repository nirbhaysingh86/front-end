import { SystemValueModel } from './systemValue.model';

export interface ViewLimitsModel {
  auditor?: SystemValueModel;
  accountAge?: SystemValueModel;
  followUp?: SystemValueModel;
  hiddenRecords?: SystemValueModel;
  status?: SystemValueModel;
  paymentStatus?: SystemValueModel;
}
