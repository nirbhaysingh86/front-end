import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GetDefaultViewLimitsResponseModel } from '../../model/responses/getDefaultViewLimitsResponse.model';
import { GetWorklistColumnsResponseModel } from '../../model/responses/getWorklistColumnsResponse.model';

@Injectable()
export class ConfigurationService {
  private apiBase = environment.apiBase; // URL to web api

  constructor(protected httpClient: HttpClient) {}

  /**
   * get default limit settings
   * @returns default limit settings
   */
  public getDefaultViewLimits(): Observable<GetDefaultViewLimitsResponseModel> {
    return this.httpClient
      .get<GetDefaultViewLimitsResponseModel>(this.apiBase + 'configuration/defaultViewLimits')
      .pipe(take(1));
  }

  /**
   * get all worklist columns
   * @returns all worklist columns
   */
  public getWorklistColumns(): Observable<GetWorklistColumnsResponseModel> {
    return this.httpClient
      .get<GetWorklistColumnsResponseModel>(this.apiBase + 'configuration/worklist/columns')
      .pipe(take(1));
  }
}
