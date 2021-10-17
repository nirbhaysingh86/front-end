export interface PaymentDetailsOtherResponse {
  id: number;
  paidBy: string;
  accountNumber: number;
  adjustCode: string;
  adjustCodeDescription: string;
  adjustmentType: string;
  postingCode: string;
  payerId: string;
  amount: number;
  importDate: string;
  payerNumber: number;
 }

export type GetWorklistPaymentDetailsOtherResponseModel = PaymentDetailsOtherResponse[];
