export interface PaymentsResponse {
  id: number;
  paidBy: string;
  payerId: number;
  payerName: string;
  contractName: string;
  paymentDate: string;
  estPayAllowable: string;
  actualPayment: string;
  writeoff: string;
  balanceDue: string;
  
}

export type GetWorklistPaymentsResponseModel = PaymentsResponse[];
