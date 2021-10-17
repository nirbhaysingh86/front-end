import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { find, isNil, groupBy, map as lMap, sortBy } from 'lodash';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GetViewsResponseModel } from '../../model/responses/getViewsResponse.model';
import { GetRulesResponseModel, RuleResponse } from '../../model/responses/getRulesResponse.model';
import { TableModel } from '../../model/table.model';
import { ViewLimitOptionsModel } from '../../model/viewLimitOptions.model';
import { SystemValueModel } from '../../model/systemValue.model';
import { CreateViewRequestModel } from '../../model/requests/createViewRequest.model';
import { CreateViewResponseModel } from '../../model/responses/createViewResponse.model';
import { GetFieldsResponseModel } from '../../model/responses/getFieldsResponse.model';
import { FilterAdministrationWizardModel } from '../../model/filterAdministrationWizard.model';
import { GetFieldValuesResponseModel } from '../../model/responses/getFieldValuesResponse.model';
import { RuleRequestModel, CreateRulesRequestModel } from '../../model/requests/createRulesRequest.model';
import { CreateRulesResponseModel } from '../../model/responses/createRulesResponse.model';

@Injectable()
export class ViewsService {
  private apiBase = environment.apiBase; // URL to web api

  constructor(protected httpClient: HttpClient) {}

  private mapView(v: CreateViewResponseModel, limitOptions: ViewLimitOptionsModel): TableModel {
    const findSystemValueDescription = (code: number, options: SystemValueModel[]) => {
      const found = find(options, ['code', code]);
      if (found) {
        return found.description;
      }
      return '';
    };
    return {
      id: v.id,
      fieldList: [
        {
          fieldType: 'label',
          fieldName: 'View Name',
          fieldValue: v.name,
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'View Description',
          fieldValue: v.description,
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Auditor',
          fieldValue: findSystemValueDescription(v.limits.auditor, limitOptions.auditor),
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Follow-Up',
          fieldValue: findSystemValueDescription(v.limits.followUp, limitOptions.followUp),
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Status',
          fieldValue: findSystemValueDescription(v.limits.status, limitOptions.status),
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Account Age',
          fieldValue: findSystemValueDescription(v.limits.accountAge, limitOptions.accountAge),
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Hidden Records',
          fieldValue: findSystemValueDescription(v.limits.hiddenRecords, limitOptions.hiddenRecords),
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'action-checkbox',
          fieldName: 'Default View',
          fieldValue: v.isDefault,
          hasCheckAll: false,
          readonly: true,
          footerContent: ''
        }
      ],
      expandData: null,
      checked: false,
      hidden: false,
      origin: v
    };
  }

  /**
   * map rules response to table data for UI use
   * @param rules rules response
   * @returns rules in table data format
   */
  private mapRule(r: RuleResponse): TableModel {
    return {
      id: r.id,
      fieldList: [
        {
          fieldType: 'label',
          fieldName: 'Facility Name',
          fieldValue: 'All Facilities',
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Rule Type',
          fieldValue: r.fieldName,
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Operand',
          fieldValue: r.operand,
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Code',
          fieldValue: r.valueId,
          hasCheckAll: false,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Rule',
          fieldValue: isNil(r.value) ? `${r.beginRange} - ${r.endRange}` : r.value,
          hasCheckAll: false,
          footerContent: ''
        }
      ],
      expandData: null,
      checked: false,
      hidden: false,
      origin: r
    };
  }

  /**
   * map fields from response for UI use
   * @param fields fields in raw format
   * @returns fields in UI format
   */
  private mapFields(fields: GetFieldsResponseModel): FilterAdministrationWizardModel[] {
    return lMap(groupBy(fields, 'category'), (items, c) => ({
      ruleCategory: c,
      ruleTypeOptions: sortBy(
        items.map((item) => ({
          id: item.id,
          ruleType: item.description,
          ruleSubCategory: item.selectionType
        })),
        ['ruleType']
      )
    }));
  }

  /**
   * get views without mapping
   * @returns views
   */
  public getRawViews(): Observable<GetViewsResponseModel> {
    return this.httpClient.get<GetViewsResponseModel>(this.apiBase + 'views').pipe(take(1));
  }

  /**
   * get views
   * @param limitOptions all limit options to mapping
   * @returns views
   */
  public getViews(limitOptions: ViewLimitOptionsModel): Observable<TableModel[]> {
    return this.getRawViews().pipe(map((views) => views.map((v) => this.mapView(v, limitOptions))));
  }

  /**
   * get view rules
   * @param viewId id of view
   * @returns rules
   */
  public getRules(viewId: number): Observable<TableModel[]> {
    return this.httpClient.get<GetRulesResponseModel>(this.apiBase + `views/${viewId}/rules`).pipe(
      take(1),
      map((rules) => rules.map((r) => this.mapRule(r)))
    );
  }

  /**
   * create view
   * @param view view data
   * @returns created view
   */
  public createView(view: CreateViewRequestModel): Observable<CreateViewResponseModel> {
    return this.httpClient.post<CreateViewResponseModel>(this.apiBase + 'views', view).pipe(take(1));
  }

  /**
   * update view
   * @param viewId id of view
   * @param view view data
   * @returns updated view
   */
  public updateView(
    viewId: number,
    view: CreateViewRequestModel,
    limitOptions: ViewLimitOptionsModel
  ): Observable<TableModel> {
    return this.httpClient.put<CreateViewResponseModel>(this.apiBase + `views/${viewId}`, view).pipe(
      take(1),
      map((v) => this.mapView(v, limitOptions))
    );
  }

  /**
   * delete view
   * @param viewId id of view
   * @returns void
   */
  public deleteView(viewId: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiBase + `views/${viewId}`).pipe(take(1));
  }

  /**
   * get all fields
   * @returns fields
   */
  public getFields(): Observable<FilterAdministrationWizardModel[]> {
    return this.httpClient
      .get<GetFieldsResponseModel>(this.apiBase + 'views/fields')
      .pipe(take(1), map(this.mapFields));
  }

  /**
   * get values of field
   * @param fieldId id of field
   * @returns field values
   */
  public getFieldValues(fieldId: number): Observable<GetFieldValuesResponseModel> {
    return this.httpClient
      .get<GetFieldValuesResponseModel>(this.apiBase + `views/fields/${fieldId}/values`)
      .pipe(take(1));
  }

  /**
   * create view rules
   * @param viewId id of view
   * @param rules rules data
   * @returns created view rules
   */
  public createViewRules(viewId: number, rules: CreateRulesRequestModel): Observable<CreateRulesResponseModel> {
    return this.httpClient.post<CreateRulesResponseModel>(this.apiBase + `views/${viewId}/rules`, rules).pipe(take(1));
  }

  /**
   * update view rule
   * @param viewId id of view
   * @param ruleId id of rule
   * @param rule rule data
   * @returns void
   */
  public updateViewRule(viewId: number, ruleId: number, rule: RuleRequestModel): Observable<TableModel> {
    return this.httpClient
      .put<RuleResponse>(this.apiBase + `views/${viewId}/rules/${ruleId}`, rule)
      .pipe(take(1), map(this.mapRule));
  }

  /**
   * delete view rule
   * @param viewId id of view
   * @param ruleId id of rule
   * @returns void
   */
  public deleteViewRule(viewId: number, ruleId: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiBase + `views/${viewId}/rules/${ruleId}`).pipe(take(1));
  }
}
