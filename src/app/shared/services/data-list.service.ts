import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../model/user.model';
import { FilterAdministrationWizardModel } from '../../model/filterAdministrationWizard.model';
import { MyWorklistColumnSettingsModel } from '../../model/myWorklistColumnSettings.model';
import { TableModel } from '../../model/table.model';

/**
 * This class provides the DataListService service
 */
@Injectable()
export class DataListService {
  private apiUrl = environment.mockApiBase; // URL to web api

  /**
   * Creates a new DataListService with the injected HttpClient.
   */
  constructor(protected httpClient: HttpClient) {}

  /**
   * GET table data for Login page
   */
  getUserData(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.apiUrl + 'dataUser');
  }

  /**
   * GET Lookups data for pages
   */
  getLookupsData(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'dataLookups');
  }

  /**
   * GET Contact Information data for pages
   */
  getContactInformationData(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'dataContactInformation');
  }

  /**
   * GET table data for My Worklist page
   */
  getMyWorklistData(tableFilterData: any): Observable<TableModel[]> {
    return this.httpClient.get<TableModel[]>(this.apiUrl + 'dataMyWorklist');
  }

  /**
   * GET column settings data for My Worklist page
   */
  getMyWorklistColumnSettingsData(): Observable<MyWorklistColumnSettingsModel[]> {
    return this.httpClient.get<MyWorklistColumnSettingsModel[]>(this.apiUrl + 'dataMyWorklistColumnSettings');
  }

  /**
   * GET table data for View Administration page
   */
  getViewAdministrationData(tableFilterData: any): Observable<TableModel[]> {
    return this.httpClient.get<TableModel[]>(this.apiUrl + 'dataViewAdministration');
  }

  /**
   * GET facility table data for View Administration page
   */
  getViewAdministrationFacilityData(tableFilterData: any): Observable<TableModel[]> {
    return this.httpClient.get<TableModel[]>(this.apiUrl + 'dataViewAdministrationFacility');
  }

  /**
   * GET filter Administration Wizard modal data for View Administration page
   */
  getFilterAdministrationWizardData(): Observable<FilterAdministrationWizardModel[]> {
    return this.httpClient.get<FilterAdministrationWizardModel[]>(this.apiUrl + 'dataFilterAdministrationWizard');
  }
}
