import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SystemValueModel } from '../../model/systemValue.model';

@Injectable()
export class LookupService {
  private apiBase = environment.apiBase; // URL to web api

  constructor(protected httpClient: HttpClient) {}

  /**
   * get system values according provided code type
   * @param codeType code type
   * @returns system values
   */
  public getSystemValues(codeType: string): Observable<SystemValueModel[]> {
    return this.httpClient
      .get<SystemValueModel[]>(this.apiBase + 'lookup/systemValues', { params: { codeType } })
      .pipe(take(1));
  }
}
