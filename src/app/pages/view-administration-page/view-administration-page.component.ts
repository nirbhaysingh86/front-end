import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DataListService } from '../../shared/services/data-list.service';
import { AuthService } from '../../shared/services/auth.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { ViewsService } from '../../shared/services/views.service';
import { LookupService } from '../../shared/services/lookup.service';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { FilterAdministrationWizardModel, RuleTypeOptionModel } from '../../model/filterAdministrationWizard.model';
import { TableModel } from '../../model/table.model';
import { TableOptionActionModel } from '../../model/tableOptionAction.model';
import { ViewLimitOptionsModel } from '../../model/viewLimitOptions.model';
import { ViewLimitsModel } from '../../model/viewLimits.model';
import { ViewModel } from '../../model/view.model';
import { PagePerNumberViewAdministrationDropdownOptions } from '../../../config/configuration';
import { forEach, keys, find, findIndex } from 'lodash';
import { CreateViewRequestModel } from '../../model/requests/createViewRequest.model';
import { FieldValueResponseModel } from '../../model/responses/getFieldValuesResponse.model';
import { CreateRulesRequestModel } from '../../model/requests/createRulesRequest.model';
import { GetDefaultViewLimitsResponseModel } from '../../model/responses/getDefaultViewLimitsResponse.model';
import { CreateViewResponseModel } from '../../model/responses/createViewResponse.model';
import { RuleResponse } from '../../model/responses/getRulesResponse.model';

type viewLimitsKey = 'auditor' | 'followUp' | 'status' | 'accountAge' | 'hiddenRecords';

/**
 * This class represents the lazy loaded ViewAdministrationPageComponent.
 */
@Component({
  selector: 'app-sd-view-administration-page',
  templateUrl: 'view-administration-page.component.html',
  styleUrls: ['view-administration-page.component.scss']
})
export class ViewAdministrationPageComponent implements OnInit {
  dataListViewAdministration?: TableModel[];
  pagedDataListViewAdministration: TableModel[] = [];
  dataListViewAdministrationFacility: TableModel[] = [];
  dataListFilterAdministrationWizard: FilterAdministrationWizardModel[] = [];
  viewLimitOptions: ViewLimitOptionsModel = {
    auditor: [],
    followUp: [],
    status: [],
    accountAge: [],
    hiddenRecords: []
  };
  defaultViewLimits: ViewLimitsModel = {};
  initialView?: ViewModel;
  initialRule?: RuleResponse;
  initialRuleCategory?: FilterAdministrationWizardModel;
  initialRuleType?: RuleTypeOptionModel;

  valuesOptions: FieldValueResponseModel[] = [];

  pageData = {
    pagePerNumber: '15 per page', // row number per page
    pageIndex: 0, // current page index
    totalRow: 0 // total number of rows
  };
  pagePerNumberDropdownOptions = PagePerNumberViewAdministrationDropdownOptions;

  modalData: {
    name: string;
    viewId: number;
  } = {
    // 'modal-windows-new-view', 'modal-windows-filter-administration-wizard', 'modal-windows-filter-administration-wizard-edit',
    // 'modal-windows-filter-administration-wizard-add'
    name: '',
    viewId: 0
  };
  confirmModalData = {
    title: '',
    description: '',
    sourceModal: ''
  };
  menuCollapsed = false;
  collapsedDraggableLine = false;
  ruleTableHeader = {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'Facility Name',
        hasCheckAll: false,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Rule Type',
        hasCheckAll: false,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Operand',
        hasCheckAll: false,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Code',
        hasCheckAll: false,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Rule',
        hasCheckAll: false,
        footerContent: ''
      }
    ]
  };
  private sub: any;
  pageType = '';
  selectedView?: TableModel;
  selectedRule?: TableModel;

  /**
   * Creates an instance of the ViewAdministrationPageComponent with the injected
   * DataListService.
   */
  constructor(
    public dataListService: DataListService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public spinnerService: SpinnerService,
    private viewsService: ViewsService,
    private lookupService: LookupService,
    private configurationService: ConfigurationService,
    private toastrService: ToastrService
  ) {}

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      if (params['pageType'] !== undefined) {
        this.pageType = params['pageType'];

        this.clickNewView();
      }
    });

    forkJoin({
      auditor: this.lookupService.getSystemValues('AMAuditorType'),
      followUp: this.lookupService.getSystemValues('AMFollowUpType'),
      status: this.lookupService.getSystemValues('AMStatusType'),
      accountAge: this.lookupService.getSystemValues('AMRecordAgeType'),
      hiddenRecords: this.lookupService.getSystemValues('AMRecordHiddenType')
    })
      .pipe(
        mergeMap((resp) => {
          this.viewLimitOptions = resp;
          return this.viewsService.getViews(this.viewLimitOptions);
        })
      )
      .subscribe((resp) => {
        this.dataListViewAdministration = resp;
        this.setPagination();
      });

    this.viewsService.getFields().subscribe((resp) => {
      this.dataListFilterAdministrationWizard = resp;
    });
  }

  /**
   * set pagination
   */
  setPagination(): void {
    if (this.dataListViewAdministration) {
      this.pageData.totalRow = this.dataListViewAdministration.length;
      const perPage = parseInt(this.pageData.pagePerNumber, 10);
      this.pageData = { ...this.pageData };
      this.pagedDataListViewAdministration = this.dataListViewAdministration.slice(
        this.pageData.pageIndex * perPage,
        (this.pageData.pageIndex + 1) * perPage
      );
    }
  }

  /**
   * click Menu
   */
  clickMenu(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }

  setDefaultLimits(resp: GetDefaultViewLimitsResponseModel): void {
    forEach(keys(resp), (field) => {
      this.defaultViewLimits[field as viewLimitsKey] = find(this.viewLimitOptions[field as viewLimitsKey], [
        'code',
        resp[field as viewLimitsKey]
      ]);
    });
  }

  /**
   * click New View
   */
  clickNewView(): void {
    this.configurationService.getDefaultViewLimits().subscribe((resp) => {
      this.setDefaultLimits(resp);
      this.initialView = {
        name: '',
        description: '',
        limits: this.defaultViewLimits,
        isDefault: false
      };
      this.modalData['name'] = 'modal-windows-new-view';
    });
  }

  /**
   * close Modal Window of New View
   */
  closeModalWindowNewView(): void {
    this.modalData['name'] = '';
  }

  /**
   * close Modal Window of Filter Administration Wizard
   */
  closeModalWindowFilterAdministrationWizard(): void {
    this.modalData['name'] = '';
    this.modalData['viewId'] = 0;
  }

  // clickDraggableLine
  clickDraggableLine(): void {
    this.collapsedDraggableLine = !this.collapsedDraggableLine;
  }

  /**
   * chang Pagination
   */
  changePagination(event: any): void {
    this.pageData = event;
    this.setPagination();
  }

  /**
   * logout
   */
  clickLogout(): void {
    this.authService.logout();
  }

  /**
   * click on view
   */
  toggleView(view: TableModel): void {
    if (view.checked) {
      this.selectedView = view;
      this.reloadRules(view.id);
    } else {
      this.selectedView = undefined;
    }
    this.selectedRule = undefined;
  }

  /**
   * reload views
   */
  reloadViews(): void {
    this.viewsService.getViews(this.viewLimitOptions).subscribe((resp) => {
      this.dataListViewAdministration = resp;
      this.setPagination();
    });
  }

  /**
   * reload view rules
   * @param viewId view id
   */
  reloadRules(viewId: number): void {
    this.viewsService.getRules(viewId).subscribe((resp) => {
      this.dataListViewAdministrationFacility = resp;
    });
  }

  /**
   * reset initial state for edit
   */
  resetInitialState(): void {
    this.initialRuleCategory = undefined;
    this.initialRuleType = undefined;
    this.initialRule = undefined;
  }

  /**
   * create or update view
   * @param view view data
   */
  saveView(view: CreateViewRequestModel): void {
    if (this.modalData.name === 'modal-windows-new-view') {
      this.viewsService.createView(view).subscribe((resp) => {
        this.toastrService.success('View Created Successfully');
        this.modalData['name'] = 'modal-windows-filter-administration-wizard';
        this.modalData['viewId'] = resp.id;
        this.resetInitialState();
        this.reloadViews();
      });
    } else {
      this.viewsService.updateView(this.modalData['viewId'], view, this.viewLimitOptions).subscribe((resp) => {
        this.toastrService.success('View Updated Successfully');
        this.modalData['name'] = '';
        this.modalData['viewId'] = 0;
        const index = findIndex(this.dataListViewAdministration, ['id', resp.id]);
        if (index > -1) {
          this.dataListViewAdministration?.splice(index, 1, resp);
          this.selectedView = resp;
          this.selectedView.checked = true;
        } else {
          this.reloadViews();
        }
      });
    }
  }

  /**
   * load values for field
   * @param fieldId id of field
   */
  loadValues(fieldId: number): void {
    this.viewsService.getFieldValues(fieldId).subscribe((resp) => {
      this.valuesOptions = resp;
    });
  }

  /**
   * create or update rules
   * @param rules rules data
   */
  saveRules(rules: CreateRulesRequestModel): void {
    if (
      this.modalData.name === 'modal-windows-filter-administration-wizard' ||
      this.modalData.name === 'modal-windows-filter-administration-wizard-add'
    ) {
      this.viewsService.createViewRules(this.modalData['viewId'], rules).subscribe(() => {
        this.toastrService.success('View Rules Created Successfully');
        if (this.modalData.name === 'modal-windows-filter-administration-wizard') {
          this.router.navigate(['/my-worklist-page']);
        } else {
          this.modalData.name = '';
          this.reloadRules(this.selectedView!.id);
        }
      });
    } else {
      this.viewsService.updateViewRule(this.selectedView!.id, this.selectedRule!.id, rules[0]).subscribe((r) => {
        this.toastrService.success('View Rules Updated Successfully');
        this.modalData.name = '';
        const index = findIndex(this.dataListViewAdministrationFacility, ['id', r.id]);
        if (index > -1) {
          r.checked = this.dataListViewAdministrationFacility[index].checked;
          this.dataListViewAdministrationFacility.splice(index, 1, r);
          this.selectedRule = r;
        } else {
          this.reloadRules(this.selectedView!.id);
        }
      });
    }
  }

  /**
   * select/unselect rule
   * @param rule rule data
   */
  toggleRule(rule: TableModel): void {
    if (rule.checked) {
      this.selectedRule = rule;
    } else {
      this.selectedRule = undefined;
    }
  }

  /**
   * close confirm modal
   * @param confirm confirm or cancel
   */
  closeModalWindowConfirm(confirm: boolean): void {
    if (confirm) {
      if (this.selectedRule) {
        this.viewsService.deleteViewRule(this.selectedView!.id, this.selectedRule.id).subscribe(() => {
          this.modalData.name = '';
          this.toastrService.success('Rule Deleted Successfully');
          this.selectedRule = undefined;
          this.reloadRules(this.selectedView!.id);
        });
      } else if (this.selectedView) {
        this.viewsService.deleteView(this.selectedView.id).subscribe(() => {
          this.modalData.name = '';
          this.toastrService.success('View Deleted Successfully');
          this.selectedView = undefined;
          this.selectedRule = undefined;
          this.reloadViews();
        });
      }
    } else {
      this.modalData.name = '';
    }
  }

  // delete rule
  deleteRule(): void {
    this.modalData.name = 'modal-windows-confirm';
    this.confirmModalData.title = 'Confirm';
    this.confirmModalData.description = 'Are you sure to delete this rule?';
  }

  /**
   * click on delete button to remove view/rule
   */
  clickDelete(): void {
    if (this.selectedRule) {
      this.deleteRule();
    } else if (this.selectedView) {
      this.modalData.name = 'modal-windows-confirm';
      this.confirmModalData.title = 'Confirm';
      this.confirmModalData.description = 'Are you sure to delete this view?';
    }
  }

  /**
   * edit rule
   */
  editRule(): void {
    forEach(this.dataListFilterAdministrationWizard, (c) => {
      const found = find(c.ruleTypeOptions, ['id', this.selectedRule!.origin.fieldId]);
      if (found) {
        this.initialRuleType = found;
        this.initialRuleCategory = c;
      }
      return !found;
    });
    if (this.initialRuleType?.ruleSubCategory === 'Values') {
      this.viewsService.getFieldValues(this.initialRuleType.id).subscribe((resp) => {
        this.valuesOptions = resp;
        this.initialRule = this.selectedRule!.origin;
        this.modalData.name = 'modal-windows-filter-administration-wizard-edit';
      });
    } else {
      this.initialRule = this.selectedRule!.origin;
      this.modalData.name = 'modal-windows-filter-administration-wizard-edit';
    }
  }

  /**
   * click on edit button to update view/rule
   */
  clickEdit(): void {
    if (this.selectedRule) {
      this.editRule();
    } else if (this.selectedView) {
      const view = this.selectedView.origin as CreateViewResponseModel;
      this.setDefaultLimits(view.limits);
      this.initialView = {
        name: view.name,
        description: view.description,
        limits: this.defaultViewLimits,
        isDefault: view.isDefault
      };
      this.modalData.name = 'modal-windows-edit-view';
      this.modalData.viewId = this.selectedView.id;
    }
  }

  // click on table context menu item
  clickTableOptions(event: TableOptionActionModel): void {
    this.selectedRule = event.data;
    switch (event.action) {
      case 'Edit View Rule':
        this.editRule();
        break;
      case 'Remove View Rule':
        this.deleteRule();
        break;
      case 'Add View Rule':
        this.modalData['name'] = 'modal-windows-filter-administration-wizard-add';
        this.modalData['viewId'] = this.selectedView!.id;
        this.resetInitialState();
        break;
      default:
        break;
    }
  }
}
