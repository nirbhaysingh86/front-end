import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { omit } from 'lodash';

import { environment } from '../../../environments/environment';
import { GetLayoutsResponseModel, LayoutResponse } from '../../model/responses/getLayoutsResponse.model';
import { GetWorklistAccountsQueryModel } from '../../model/requests/getWorklistAccountsQuery.model';
import { GetWorklistAccountsResponseModel } from '../../model/responses/getWorklistAccountsResponse.model';
import { GetWorklistRevCptResponseModel } from '../../model/responses/getWorklistRevCptResponse.model';
import {
  GetWorklistChargeCodesResponseModel,
  ChargeCodeResponse
} from '../../model/responses/getWorklistChargeCodesResponse.model';
import { GetWorklistClaimsHistoryResponseModel } from '../../model/responses/getWorklistClaimsHistoryResponse.model';
import { GetWorklistProfessionalClaimsResponseModel } from '../../model/responses/getWorklistProfessionalClaimsResponse.model';
import { CreateWorklistChargeCodesRequestModel } from '../../model/requests/createWorklistChargeCodesRequest.model';
import { CreateLayoutRequestModel } from '../../model/requests/createLayoutRequest.model';
import { GetWorklistEorResponseModel } from '../../model/responses/getWorklistEorResponse.model';
import { GetWorklistDetailReimbResponseModel } from '../../model/responses/getWorklistDetailReimbResponse.model';
import { GetWorklistAuditStatusHistoryResponseModel } from '../../model/responses/getWorklistAuditStatusHistoryResponse.model';
import { GetWorklistIcdCodesResponseModel } from '../../model/responses/getWorklistIcdCodesResponse.model';
import { GetWorklistPaymentsResponseModel } from '../../model/responses/getWorklistPaymentsResponse.model';
import { GetWorklistPaymentDetailsResponseModel } from '../../model/responses/getWorklistPaymentsDetailsResponse.model';
import { GetWorklistPaymentDetailsOtherResponseModel } from '../../model/responses/getWorklistPaymentsDetailsOtherResponse.model';
import { GetWorklistContactInfoResponseModel } from '../../model/responses/getWorklistContactInfoResponse.model';
import { ContactInformationModel } from '../../model/contactInformation.model';

@Injectable()
export class WorklistService {
  private apiBase = environment.apiBase; // URL to web api

  constructor(protected httpClient: HttpClient) {}

  /**
   * get all layouts
   * @returns layouts
   */
  public getLayouts(): Observable<GetLayoutsResponseModel> {
    return this.httpClient.get<GetLayoutsResponseModel>(this.apiBase + 'worklist/layouts').pipe(take(1));
  }

  /**
   * create new layout
   * @param layout layout to create
   * @returns created layout
   */
  public createLayout(layout: CreateLayoutRequestModel): Observable<LayoutResponse> {
    return this.httpClient.post<LayoutResponse>(this.apiBase + 'worklist/layouts', layout).pipe(take(1));
  }

  /**
   * update layout
   * @param layoutId id of layout to update
   * @param layout layout to update
   * @returns updated layout
   */
  public updateLayout(layoutId: number, layout: LayoutResponse): Observable<LayoutResponse> {
    return this.httpClient
      .put<LayoutResponse>(this.apiBase + `worklist/layouts/${layoutId}`, omit(layout, 'id'))
      .pipe(take(1));
  }

  /**
   * delete layout
   * @param layoutId id of layout to delete
   * @returns void
   */
  public deleteLayout(layoutId: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiBase + `worklist/layouts/${layoutId}`).pipe(take(1));
  }

  /**
   * search worklist account
   * @param params query parameters
   * @returns search result
   */
  public getAccounts(params: GetWorklistAccountsQueryModel): Observable<GetWorklistAccountsResponseModel> {
    return this.httpClient
      .get<GetWorklistAccountsResponseModel>(this.apiBase + 'worklist/accounts', { params: params as any })
      .pipe(take(1));
  }

  /**
   * get patient revCPT detail
   * @param patientId patient id
   * @returns revCPT details
   */
  public getRevCpt(patientId: string): Observable<GetWorklistRevCptResponseModel> {
    return this.httpClient
      .get<GetWorklistRevCptResponseModel>(this.apiBase + `worklist/accounts/${patientId}/revCpt`)
      .pipe(take(1));
  }

  /**
   * get patient charge codes details
   * @param patientId patient id
   * @returns charge codes details
   */
  public getChargeCodes(patientId: string): Observable<GetWorklistChargeCodesResponseModel> {
    return this.httpClient
      .get<GetWorklistChargeCodesResponseModel>(this.apiBase + `worklist/accounts/${patientId}/chargeCodes`)
      .pipe(take(1));
  }

  /**
   * get patient claims history
   * @param patientId patient id
   * @returns claims history
   */
  public getClaimsHistory(patientId: string): Observable<GetWorklistClaimsHistoryResponseModel> {
    return this.httpClient
      .get<GetWorklistClaimsHistoryResponseModel>(this.apiBase + `worklist/accounts/${patientId}/claimsHistory`)
      .pipe(take(1));
  }

  /**
   * get patient professional claims
   * @param patientId patient id
   * @returns professional claims
   */
  public getProfessionalClaims(patientId: string): Observable<GetWorklistProfessionalClaimsResponseModel> {
    return this.httpClient
      .get<GetWorklistProfessionalClaimsResponseModel>(
        this.apiBase + `worklist/accounts/${patientId}/professionalClaims`
      )
      .pipe(take(1));
  }
  /**
  * get patient eor detail
  * @param patientId patient id
  * @returns eor details
  */
  public getEor(patientId: string): Observable<GetWorklistEorResponseModel> {
    return this.httpClient
      .get<GetWorklistEorResponseModel>(this.apiBase + `worklist/accounts/${patientId}/eor`)
      .pipe(take(1));
  }
  /**
 * get patient detailReimb detail
 * @param patientId patient id
 * @returns detailReimb details
 */
  public getDetailReimb(patientId: string): Observable<GetWorklistDetailReimbResponseModel> {
    return this.httpClient
      .get<GetWorklistDetailReimbResponseModel>(this.apiBase + `worklist/accounts/${patientId}/detailReimb`)
      .pipe(take(1));
  }
  /**
* get patient audit status history detail
* @param patientId patient id
* @returns detailReimb details
*/
  public getAuditStatusHistory(patientId: string): Observable<GetWorklistAuditStatusHistoryResponseModel> {
    return this.httpClient
      .get<GetWorklistAuditStatusHistoryResponseModel>(this.apiBase + `worklist/accounts/${patientId}/auditStatusHistory`)
      .pipe(take(1));
  }
  /**
* get patient audit status history detail
* @param patientId patient id
* @returns detailReimb details
*/
  public getContactInfo(patientId: string): Observable<GetWorklistContactInfoResponseModel> {
    return this.httpClient
      .get<GetWorklistContactInfoResponseModel>(this.apiBase + `worklist/accounts/${patientId}/contactInfo`)
      .pipe(take(1));
  }
  /**
* get patient audit status history detail
* @param patientId patient id
* @returns detailReimb details
*/
  public getPayments(patientId: string): Observable<GetWorklistPaymentsResponseModel> {
    return this.httpClient
      .get<GetWorklistPaymentsResponseModel>(this.apiBase + `worklist/accounts/${patientId}/payments`)
      .pipe(take(1));
  }
  /**
   * GET Payment Details popup data of PaymentAdjustmentsTab table data for My Worklist Research page
   */

  public getPaymentDetails(patientId: string, payerNumber: number): Observable<GetWorklistPaymentDetailsResponseModel> {
    return this.httpClient
      .get<GetWorklistPaymentDetailsResponseModel>(this.apiBase + `worklist/accounts/${patientId}/payments/${payerNumber}`)
      .pipe(take(1));
  }
  /**
   * delete patient payment details
   * @param patientId patient id
   * @param chargeCodeId charge code id
   * @returns void
   */
  public deletePaymentDetails(patientId: string, payerNumber: any): Observable<void> {
    return this.httpClient
      .delete<void>(this.apiBase + `worklist/accounts/${patientId}/payments/${payerNumber}`)
      .pipe(take(1));
  }
  /**
 * commit patient transaction
 * @param patientId patient id
 * @param payerNumber charge code id
 * @returns updated charge code details
 */
  public commitTransaction(
    patientId: string,
    payerNumber: number,
  ): Observable<any> {
    return this.httpClient
      .post<any>(this.apiBase + `worklist/accounts/${patientId}/payments/${payerNumber}/commit`, {})
      .pipe(take(1));
  }
  /**
 * GET Other Payer Transactions popup data of PaymentAdjustmentsTab table data for My Worklist Research page
 */

  public getOtherPayerTransactions(patientId: string): Observable<GetWorklistPaymentDetailsOtherResponseModel> {
    return this.httpClient
      .get<GetWorklistPaymentDetailsOtherResponseModel>(this.apiBase + `worklist/accounts/${patientId}/payments/other`)
      .pipe(take(1));
  }


  /**
* commit patient transaction
* @param patientId patient id
* @param payerNumber charge code id
* @returns updated charge code details
*/
  public saveOtherTransaction(
    patientId: string,
    details: GetWorklistPaymentDetailsOtherResponseModel
  ): Observable<any> {
    return this.httpClient
      .patch<any>(this.apiBase + `worklist/accounts/${patientId}/payments/other`, details)
      .pipe(take(1));
  }
  /**
* get patient audit status history detail
* @param patientId patient id
* @returns detailReimb details
*/
  public getIcdCodes(patientId: string): Observable<GetWorklistIcdCodesResponseModel> {
    return this.httpClient
      .get<GetWorklistIcdCodesResponseModel>(this.apiBase + `worklist/accounts/${patientId}/icdCodes`)
      .pipe(take(1));
  }
  
  /**
   * update patient charge code
   * @param patientId patient id
   * @param chargeCodeId charge code id
   * @param details charge code details to update
   * @returns updated charge code details
   */
  public updateChargeCodes(
    patientId: string,
    chargeCodeId: number,
    details: CreateWorklistChargeCodesRequestModel
  ): Observable<void> {
    return this.httpClient
      .put<void>(this.apiBase + `worklist/accounts/${patientId}/chargeCodes/${chargeCodeId}`, details)
      .pipe(take(1));
  }
  /**
   * update patient contact info
   * @param patientId patient id
   * @param chargeCodeId charge code id
   * @param details charge code details to update
   * @returns updated charge code details
   */
  public updateContactInfo(
    patientId: string,
    details: GetWorklistContactInfoResponseModel
  ): Observable<void> {
    return this.httpClient
      .patch<void>(this.apiBase + `worklist/accounts/${patientId}/contactInfo`, details)
      .pipe(take(1));
  }
  /**
   * create new patient contact info
   * @param patientId patient id
   * @param details new charge code details
   * @returns created patient code
   */
  public createContactInfo(
    patientId: string,
    details: GetWorklistContactInfoResponseModel
  ): Observable<ChargeCodeResponse> {
    return this.httpClient
      .patch<ChargeCodeResponse>(this.apiBase + `worklist/accounts/${patientId}/contactInfo`, details)
      .pipe(take(1));
  }
  /**
   * delete patient charge code
   * @param patientId patient id
   * @param chargeCodeId charge code id
   * @returns void
   */
  public deleteChargeCodes(patientId: string, chargeCodeId: number): Observable<void> {
    return this.httpClient
      .delete<void>(this.apiBase + `worklist/accounts/${patientId}/chargeCodes/${chargeCodeId}`)
      .pipe(take(1));
  }

  /**
   * create new patient charge code
   * @param patientId patient id
   * @param details new charge code details
   * @returns created patient charge code
   */
  public createChargeCodes(
    patientId: string,
    details: CreateWorklistChargeCodesRequestModel
  ): Observable<ChargeCodeResponse> {
    return this.httpClient
      .post<ChargeCodeResponse>(this.apiBase + `worklist/accounts/${patientId}/chargeCodes`, details)
      .pipe(take(1));
  }
}
