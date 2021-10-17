import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TableModel } from '../../model/table.model';
import { take } from 'rxjs/operators';
import { omit } from 'lodash';
import { GetWorklistPaymentDetailsResponseModel } from '../../model/responses/getWorklistPaymentsDetailsResponse.model';
import { GetWorklistPaymentDetailsOtherResponseModel } from '../../model/responses/getWorklistPaymentsDetailsOtherResponse.model';

/**
 * This class provides the DataListMyWorklistResearchService service
 */
@Injectable()
export class DataListMyWorklistResearchService {
  private apiUrl = environment.apiBase; // URL to web api

  /**
   * Creates a new DataListMyWorklistResearchService with the injected HttpClient.
   */
  constructor(protected httpClient: HttpClient) {}

  /**
   * GET auditStatusHistoryTab table data for My Worklist Research page
   */
  getMyWorklistResearchAuditStatusHistoryTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchAuditStatusHistoryTab');
  }

  /**
   * GET ChargeCodeDetailTab table data for My Worklist Research page
   */
  getMyWorklistResearchChargeCodeDetailTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchChargeCodeDetailTab');
  }

  /**
   * GET ClaimsHistoryTabClaims table data for My Worklist Research page
   */
  getMyWorklistResearchClaimsHistoryTabClaimsData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchClaimsHistoryTabClaims');
  }

  /**
   * GET ClaimsHistoryTabRemits table data for My Worklist Research page
   */
  getMyWorklistResearchClaimsHistoryTabRemitsData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchClaimsHistoryTabRemits');
  }

  /**
   * GET DetailReimbTab table data for My Worklist Research page
   */
  getMyWorklistResearchDetailReimbTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchDetailReimbTab');
  }

  /**
   * GET IcdCodesTab table data for My Worklist Research page
   */
  getMyWorklistResearchIcdCodesTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchIcdCodesTab');
  }

  /**
   * GET PaymentAdjustmentsTab table data for My Worklist Research page
   */
  getMyWorklistResearchPaymentAdjustmentsTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchPaymentAdjustmentsTab');
  }

  /**
   * GET Other Payer Transactions popup data of PaymentAdjustmentsTab table data for My Worklist Research page
   */
   
  public getMyWorklistResearchPaymentAdjustmentsTabOtherPayerTransactionsData(patientId: string): Observable<GetWorklistPaymentDetailsOtherResponseModel> {
    return this.httpClient
      .get<GetWorklistPaymentDetailsOtherResponseModel>(this.apiUrl + `worklist/accounts/${patientId}/payments/other`)
      .pipe(take(1));
  }

  /**
   * GET Payment Details popup data of PaymentAdjustmentsTab table data for My Worklist Research page
   */
   
  public getMyWorklistResearchPaymentAdjustmentsTabPaymentDetailsData(patientId: string, payerNumber: number): Observable<GetWorklistPaymentDetailsResponseModel> {
    return this.httpClient
      .get<GetWorklistPaymentDetailsResponseModel>(this.apiUrl + `worklist/accounts/${patientId}/payments/${payerNumber}`)
      .pipe(take(1));
  }
   
  /**
   * GET ProfessionalClaimsTab table data for My Worklist Research page
   */
  getMyWorklistResearchProfessionalClaimsTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchProfessionalClaimsTab');
  }

  /**
   * GET RevCPTDetailTab table data for My Worklist Research page
   */
  getMyWorklistResearchRevCPTDetailTabData(): Observable<TableModel[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'dataMyWorklistResearchRevCPTDetailTab');
  }
}
