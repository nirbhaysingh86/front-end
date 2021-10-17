export interface PaymentDetailsResponse {
  id: number;
  paidBy: string;
  paymentType: number;
  importDate: string;
  postingDate: string;
  amount: number;
  excludedAmount: number;
  adjustCode: number;
  adjustCodeDescription: string;
  payerNumber: number;
 }

export type GetWorklistPaymentDetailsResponseModel = PaymentDetailsResponse[];
