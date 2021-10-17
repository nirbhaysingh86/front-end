import { TableModel } from './table.model';
import { TableHeadersModel } from './tableHeaders.model';

export interface ResearchTablesDataModel {
  revCpt: TableModel[];
  chargeCodes: TableModel[];
  claimsHistory: {
    claims: TableModel[];
    remits: TableModel[];
  };
  professionalClaims: TableModel[];
  eor: TableModel[];
  detailReimb: TableModel[];
  auditStatusHistory: TableModel[];
  icdCodes: TableModel[];
  payments: TableModel[];
  contactInfo: TableModel[];
}

export interface ResearchTablesHeaderModel {
  revCpt: TableHeadersModel;
  chargeCodes: TableHeadersModel;
  claimsHistory: {
    claims: TableHeadersModel;
    remits: TableHeadersModel;
  };
  professionalClaims: TableHeadersModel;
  eor: TableHeadersModel;
  detailReimb: TableHeadersModel;
  auditStatusHistory: TableHeadersModel;
  icdCodes: TableHeadersModel;
  payments: TableHeadersModel;
  contactInfo: TableHeadersModel;
   
}

export interface ResearchTablesDataModelPaymentDetailModel {
  paymentDetails: TableModel[];
}

export interface ResearchDataModalPaymentDetailHeaderModel {
   
  paymentDetails: TableHeadersModel;
   
}

export interface ResearchTablesDataModelPaymentOtherModel {
  paymentDetailsOther: TableModel[];
}

export interface ResearchDataModalPaymentOtherHeaderModel {
 
  paymentDetailsOther: TableHeadersModel;
}
