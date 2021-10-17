import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { cloneDeep, find, findIndex, get, omit, trim, uniqBy, pull } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { DataListService } from '../../shared/services/data-list.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { AuthService } from '../../shared/services/auth.service';
import { WorklistService } from '../../shared/services/worklist.service';
import { ViewsService } from '../../shared/services/views.service';
import { LookupService } from '../../shared/services/lookup.service';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { TableModel } from '../../model/table.model';
import { ViewLimitsModel } from '../../model/viewLimits.model';
import { ViewLimitOptionsModel } from '../../model/viewLimitOptions.model';
import { CreateViewResponseModel } from '../../model/responses/createViewResponse.model';
import { GetViewsResponseModel } from '../../model/responses/getViewsResponse.model';
import { GetLayoutsResponseModel, LayoutResponse } from '../../model/responses/getLayoutsResponse.model';
import { ColumnResponse } from '../../model/responses/getWorklistColumnsResponse.model';
import { GetWorklistAccountsQueryModel } from '../../model/requests/getWorklistAccountsQuery.model';
import { TableHeadersModel } from '../../model/tableHeaders.model';
import { ResearchTablesDataModel } from '../../model/researchTables.model';
import { ChargeCodeResponse } from 'src/app/model/responses/getWorklistChargeCodesResponse.model';
import {
  PagePerNumberMyWorklistDropdownOptions,
  WorklistResearchTablesHeaderConfig
} from '../../../config/configuration';
import { MyWorklistResearchComponent } from '../../components/my-worklist-research/my-worklist-research.component';

/**
 * This class represents the lazy loaded MyWorkListPageComponent.
 */
@Component({
  selector: 'app-sd-my-worklist-page',
  templateUrl: 'my-worklist-page.component.html',
  styleUrls: ['my-worklist-page.component.scss']
})
export class MyWorklistPageComponent implements OnInit {
  dataList: TableModel[] = [];
  dataListShown: TableModel[] = [];
  dataListLookups: any = {};

  sortData: {
    sortColumn: string;
    sortOrder: 'Asc' | 'Desc';
  } = {
    sortColumn: '',
    sortOrder: 'Asc'
  };
  pageData = {
    pagePerNumber: '20 per page', // row number per page
    pageIndex: 0, // current page index
    totalRow: 0 // total number of rows
  };
  pagePerNumberDropdownOptions = PagePerNumberMyWorklistDropdownOptions;

  modalData = {
    name: '' // ''
  };
  confirmModalData = {
    title: '',
    description: '',
    sourceModal: '',
    event: ''
  };

  menuCollapsed = false;
  collapsedDraggableLine = false;

  isShownResearch = true;
  researchTabIndex = 0; // 10

  viewLimitOptions: ViewLimitOptionsModel = {
    auditor: [],
    followUp: [],
    status: [],
    accountAge: [],
    hiddenRecords: []
  };

  viewOptions: GetViewsResponseModel = [];

  selectedLimits: ViewLimitsModel = {};

  selectedView?: CreateViewResponseModel;

  layoutOptions: GetLayoutsResponseModel = [];

  selectedLayout?: LayoutResponse;
  layoutToEdit: LayoutResponse = {
    id: 0,
    name: '',
    description: '',
    isDefault: false,
    columns: []
  };

  queryChange$ = new Subject();

  queryParams?: GetWorklistAccountsQueryModel;

  allColumnsConfig: ColumnResponse[] = [];

  worklistTableHeader: TableHeadersModel = {
    fieldList: []
  };

  selectedRow?: TableModel;

  researchData: ResearchTablesDataModel = {
    revCpt: [],
    chargeCodes: [],
    claimsHistory: {
      claims: [],
      remits: []
    },
    professionalClaims: [],
    eor: [],
    detailReimb: [],
    auditStatusHistory: [],
    icdCodes: [],
    payments: [],
    contactInfo:[]
  };

  @ViewChild(MyWorklistResearchComponent) researchComp?: MyWorklistResearchComponent;

  /**
   * Creates an instance of the MyWorklistPageComponent with the injected
   * DataListService.
   */
  constructor(
    public dataListService: DataListService,
    private authService: AuthService,
    private worklistService: WorklistService,
    private viewsService: ViewsService,
    private lookupService: LookupService,
    private configurationService: ConfigurationService,
    public spinnerService: SpinnerService,
    private toastrService: ToastrService
  ) {}

  /**
   * OnInit
   */
  ngOnInit(): void {
    // this.dataListService.getLookupsData().subscribe((data) => {
    //   this.dataListLookups = data;
    // });

    this.queryChange$.subscribe(() => {
      this.constructQueryParams();
      if (this.queryParams) {
        this.worklistService.getAccounts(this.queryParams).subscribe((resp) => {
          this.dataList = resp.items.map((item) => {
            return {
              id: item.patientId,
              fieldList: item.values.map((v) => ({
                fieldValue: v
              })),
              expandData: null,
              checked: false,
              hidden: false,
              origin: item
            };
          });
          const hasSkippedColumn = find(this.selectedLayout?.columns, (c) => {
            // PatientID and ActualPatientID are excluded from values array
            return (c.fieldName === 'PatientID' && c.isVisible) || (c.fieldName === 'ActualPatientID' && c.isVisible);
          });
          if (hasSkippedColumn) {
            const patientIDIndex = findIndex(
              this.selectedLayout?.columns,
              (c) => c.fieldName === 'PatientID' && c.isVisible
            );
            const actualPatientIDIndex = findIndex(
              this.selectedLayout?.columns,
              (c) => c.fieldName === 'ActualPatientID' && c.isVisible
            );
            if (patientIDIndex >= 0 && actualPatientIDIndex >= 0) {
              if (patientIDIndex < actualPatientIDIndex) {
                this.dataList.forEach((item) => {
                  item.fieldList.splice(patientIDIndex, 0, {
                    fieldValue: item.origin.patientId
                  });
                  item.fieldList.splice(actualPatientIDIndex, 0, {
                    fieldValue: item.origin.actualPatientId
                  });
                });
              } else {
                this.dataList.forEach((item) => {
                  item.fieldList.splice(actualPatientIDIndex, 0, {
                    fieldValue: item.origin.actualPatientId
                  });
                  item.fieldList.splice(patientIDIndex, 0, {
                    fieldValue: item.origin.patientId
                  });
                });
              }
            } else if (patientIDIndex >= 0) {
              this.dataList.forEach((item) => {
                item.fieldList.splice(patientIDIndex, 0, {
                  fieldValue: item.origin.patientId
                });
              });
            } else if (actualPatientIDIndex >= 0) {
              this.dataList.forEach((item) => {
                item.fieldList.splice(actualPatientIDIndex, 0, {
                  fieldValue: item.origin.actualPatientId
                });
              });
            }
          }
          this.dataListShown = cloneDeep(this.dataList);
          this.pageData = {
            ...this.pageData,
            totalRow: resp.totalCount
          };
          this.selectedRow = undefined;
        });
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
        mergeMap((limits) => {
          this.viewLimitOptions = limits;
          return forkJoin({
            views: this.viewsService.getRawViews(),
            columns: this.configurationService.getWorklistColumns(),
            layouts: this.worklistService.getLayouts()
          });
        })
      )
      .subscribe((resp) => {
        this.viewOptions = resp.views;
        this.onViewChange(find(this.viewOptions, ['isDefault', true]) || this.viewOptions[0], false);

        // remove any duplicated column and empty column name
        this.allColumnsConfig = uniqBy(resp.columns, 'dataField').filter((c) => trim(c.dataField));

        this.layoutOptions = resp.layouts;
        this.layoutOptions.forEach((layout) => {
          layout.columns.sort((l1, l2) => l1.location - l2.location);
        });
        this.onLayoutChange(find(this.layoutOptions, ['isDefault', true]) || this.layoutOptions[0], false);

        this.queryChange$.next();
      });
  }

  /**
   * when selected layout changes, update table header accordingly
   * @param layout selected layout
   * @param emit reload worklist account or not
   */
  onLayoutChange(layout: LayoutResponse, emit = true): void {
    this.selectedLayout = layout;
    if (this.selectedLayout) {
      this.dataList = [];
      this.dataListShown = [];

      const fieldList = this.selectedLayout.columns
        .filter((c) => c.isVisible)
        .map((c, i) => {
          const fieldName = find(this.allColumnsConfig, ['dataField', c.fieldName])?.caption || c.fieldName;
          return {
            fieldType: i === 0 ? 'label-checkbox' : 'label',
            sortField: c.fieldName,
            fieldName,
            hasCheckAll: i === 0,
            columnWidth: c.width
          };
        });
      this.worklistTableHeader = {
        fieldList
      };
      if (emit) {
        this.queryChange$.next();
      }
    }
  }

  /**
   * when selected view chagnes, update view limit accordingly
   * @param view selected view
   * @param emit reload worklist account or not
   */
  onViewChange(view: CreateViewResponseModel, emit = true): void {
    this.selectedView = view;
    if (this.selectedView) {
      const limits = {
        accountAge: find(this.viewLimitOptions.accountAge, ['code', this.selectedView.limits.accountAge]),
        auditor: find(this.viewLimitOptions.auditor, ['code', this.selectedView.limits.auditor]),
        followUp: find(this.viewLimitOptions.followUp, ['code', this.selectedView.limits.followUp]),
        hiddenRecords: find(this.viewLimitOptions.hiddenRecords, ['code', this.selectedView.limits.hiddenRecords]),
        status: find(this.viewLimitOptions.status, ['code', this.selectedView.limits.status])
      };
      this.onLimitsChange(limits, emit);
    }
  }

  /**
   * when selected limit changes, reload worklist account accordingly
   * @param limits selected limits
   * @param emit reload worklist account or not
   */
  onLimitsChange(limits: ViewLimitsModel, emit = true): void {
    this.selectedLimits = limits;
    if (
      this.selectedLimits &&
      this.selectedLimits.auditor &&
      this.selectedLimits.followUp &&
      this.selectedLimits.status &&
      this.selectedLimits.accountAge &&
      this.selectedLimits.hiddenRecords
    ) {
      this.pageData = {
        ...this.pageData,
        pageIndex: 0
      };
      if (emit) {
        this.queryChange$.next();
      }
    }
  }

  /**
   * construct query parameters to search worklist account
   */
  private constructQueryParams(): void {
    if (
      this.selectedView &&
      this.selectedLayout &&
      this.selectedLimits.auditor &&
      this.selectedLimits.followUp &&
      this.selectedLimits.status &&
      this.selectedLimits.accountAge &&
      this.selectedLimits.hiddenRecords
    ) {
      const perPage = parseInt(this.pageData.pagePerNumber, 10);
      this.queryParams = {
        viewId: this.selectedView.id,
        auditor: this.selectedLimits.auditor.code,
        followUp: this.selectedLimits.followUp.code,
        status: this.selectedLimits.status.code,
        accountAge: this.selectedLimits.accountAge.code,
        hiddenRecords: this.selectedLimits.hiddenRecords.code,
        offset: this.pageData.pageIndex * perPage,
        limit: perPage,
        layoutId: this.selectedLayout.id
      };
      if (this.sortData.sortColumn) {
        this.queryParams.sortBy = this.sortData.sortColumn;
        this.queryParams.sortOrder = this.sortData.sortOrder;
      }
    } else {
      this.queryParams = undefined;
    }
  }

  // click Save Column Settings
  clickSaveColumnSettings(layout: LayoutResponse): void {
    if (this.authService.user?.UserId === layout.userId?.toString()) {
      layout.columns.forEach((c, i) => {
        c.location = i;
      });
      if (layout.id === this.selectedLayout?.id) {
        layout.columns
          .filter((c) => c.isVisible)
          .forEach((c) => {
            const found = find(this.worklistTableHeader.fieldList, ['sortField', c.fieldName]);
            if (found) {
              c.width = found.columnWidth || c.width;
            }
          });
      }
      this.updateLayout(layout);
    } else {
      this.showLayoutDetailsModal();
      this.layoutToEdit.columns = cloneDeep(layout.columns).map((c) => omit(c, 'id')) as any;
    }
  }

  /**
   * click Menu
   */
  clickMenu(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }

  // click Menu Options
  clickMenuOptions(optionName: string): void {
    switch (optionName) {
      case 'Create Simulation DataSet':
        this.modalData.name = 'modal-windows-create-simulator-dataset';
        break;
      case 'Create New Account':
        this.modalData.name = 'modal-windows-add-patient-account';
        break;
      case 'View Contact Information':
        this.modalData.name = 'modal-windows-contact-information';
        break;
      default:
        break;
    }
  }

  /**
   * close Modal Window
   */
  closeModalWindow(isSave: boolean, modalName: string): void {
    if (isSave) {
      switch (modalName) {
        case 'modal-windows-contact-information':
          this.modalData['name'] = 'modal-windows-confirm';
          this.confirmModalData = {
            title: 'Action Complete - Reapply View',
            description: 'Would you like your view reapplied?',
            sourceModal: 'modal-windows-contact-information',
            event: 'Reapply-View'
          };
          break;
        case 'modal-windows-confirm':
          this.modalData['name'] = '';
          if (this.confirmModalData.event === 'Delete-Layout') {
            this.deleteLayout();
          }
          break;
        default:
          this.modalData['name'] = '';
          break;
      }
    } else {
      switch (modalName) {
        case 'modal-windows-confirm':
          this.modalData['name'] = this.confirmModalData.sourceModal;
          break;
        default:
          this.modalData['name'] = '';
          break;
      }
    }
  }

  // clickDraggableLine
  clickDraggableLine(): void {
    this.collapsedDraggableLine = !this.collapsedDraggableLine;
  }

  /**
   * chang Pagination
   * @param event paging data
   */
  changePagination(event: any): void {
    this.pageData = event;
    this.queryChange$.next();
  }

  /**
   * change Sort
   * @param event sorting data
   */
  changeSort(event: any): void {
    this.sortData = event;
    this.queryChange$.next();
  }

  /**
   * click on row
   * @param row row clicked on
   */
  toggleRow(row: TableModel): void {
    if (row.checked) {
      this.selectedRow = row;
      this.loadResearch();
    } else {
      this.selectedRow = undefined;
    }
  }

  /**
   * load research table data
   */
  loadResearch(): void {
    switch (this.researchTabIndex) {
      case 0:
        this.loadRevCpt();
        break;
      case 1:
        this.loadChargeCodes();
        break;
      case 2:
        this.loadClaimsHistory();
        break;
      case 3:
        this.loadProfessionalClaims();
        break;
      case 4:
        this.loadPayments();
        break;
      case 5:
        this.loadicdCodes();
        break;
      case 10:
        this.loadEor();
        break
      case 11:
        this.loaddetailReimb()
        break;
      case 15:
        this.loadauditStatusHistory()
        break;
      case 19:
        this.loadContactInfoHistory()
        break;
      default:
        break;
    }
  }

  /**
   * map charge code response to table data
   * @param item charge code response
   * @returns charge code as table data
   */
  private mapChargeCode(item: ChargeCodeResponse): TableModel {
    return {
      id: item.id,
      fieldList: WorklistResearchTablesHeaderConfig.chargeCodes.fieldList.map((f) => ({
        fieldValue: get(item, f.sortField as string)
      })),
      checked: false,
      hidden: false,
      expandData: null
    };
  }

  /**
   * load patient revCPT details
   */
  loadRevCpt(): void {
    if (this.selectedRow) {
      this.researchData.revCpt = [];
      this.worklistService.getRevCpt(this.selectedRow.origin.actualPatientId).subscribe((resp) => {
        const revCpt = resp.map((item) => ({
          id: item.id,
          fieldList: WorklistResearchTablesHeaderConfig.revCpt.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          revCpt
        };
      });
    }
  }

  /**
   * load patient charge codes details
   */
  loadChargeCodes(): void {
    if (this.selectedRow) {
      this.researchData.chargeCodes = [];
      this.worklistService.getChargeCodes(this.selectedRow.origin.actualPatientId).subscribe((resp) => {
        const chargeCodes = resp.map(this.mapChargeCode);
        this.researchData = {
          ...this.researchData,
          chargeCodes
        };
      });
    }
  }

  /**
   * load patient claim history
   */
  loadClaimsHistory(): void {
    if (this.selectedRow) {
      this.researchData.claimsHistory = {
        claims: [],
        remits: []
      };
      this.worklistService.getClaimsHistory(this.selectedRow.origin.actualPatientId).subscribe((resp) => {
        this.researchData.claimsHistory.claims = resp.claims.map((c) => ({
          id: c.id,
          fieldList: WorklistResearchTablesHeaderConfig.claimsHistory.claims.fieldList.map((f) => ({
            fieldValue: get(c, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: c.claimDetails.map((d) => ({
            fieldList: WorklistResearchTablesHeaderConfig.claimsHistory.claims.expandData!.fieldList.map((f) => ({
              fieldValue: get(d, f.sortField as string)
            }))
          }))
        }));
        this.researchData.claimsHistory.remits = resp.remits.map((r) => ({
          id: r.id,
          fieldList: WorklistResearchTablesHeaderConfig.claimsHistory.remits.fieldList.map((f) => ({
            fieldValue: get(r, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: r.remitDetails.map((d) => ({
            fieldList: WorklistResearchTablesHeaderConfig.claimsHistory.remits.expandData!.fieldList.map((f) => ({
              fieldValue: get(d, f.sortField as string)
            }))
          }))
        }));
      });
    }
  }

  /**
   * load patient professional claims
   */
  loadProfessionalClaims(): void {
    if (this.selectedRow) {
      this.researchData.professionalClaims = [];
      this.worklistService.getProfessionalClaims(this.selectedRow.origin.actualPatientId).subscribe((resp) => {
        this.researchData.professionalClaims = resp.map((item) => ({
          id: item.id,
          fieldList: WorklistResearchTablesHeaderConfig.professionalClaims.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: item.claimDetails.map((d) => ({
            fieldList: WorklistResearchTablesHeaderConfig.professionalClaims.expandData!.fieldList.map((f) => ({
              fieldValue: get(d, f.sortField as string)
            }))
          }))
        }));
      });
    }
  }

  /**
   * load patient eor details
   */
  loadEor(): void {
    if (this.selectedRow) {
      this.researchData.eor = [];
      this.worklistService.getEor(this.selectedRow.origin.actualPatientId).subscribe((er) => {
        const eor = er.map((item,index :number) => ({
          id: index,
          fieldList: WorklistResearchTablesHeaderConfig.eor.fieldList.map((f) => ({
            fieldValue: item
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          eor
        };
      });
    }
  }
  /**
  * load patient detail remb details
  */
  loaddetailReimb(): void {
    if (this.selectedRow) {
      this.researchData.detailReimb = [];
      this.worklistService.getDetailReimb(this.selectedRow.origin.actualPatientId).subscribe((detailRe) => {
        const detailReimb = detailRe.map((item, index: number) => ({
          id: index,
          fieldList: WorklistResearchTablesHeaderConfig.detailReimb.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          detailReimb
        };
      });
    }
  }
  /**
 * load patient audit Status History
 */
  loadauditStatusHistory(): void {
    if (this.selectedRow) {
      this.researchData.auditStatusHistory = [];
      this.worklistService.getAuditStatusHistory(this.selectedRow.origin.actualPatientId).subscribe((auditStatus) => {
        const auditStatusHistory = auditStatus.map((item, index: number) => ({
          id: item.id,
          fieldList: WorklistResearchTablesHeaderConfig.auditStatusHistory.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          auditStatusHistory
        };
      });
    }
  }
  /**
* load contact info
*/
  loadContactInfoHistory(): void {
    if (this.selectedRow) {
      this.researchData.contactInfo = [];
      this.worklistService.getContactInfo(this.selectedRow.origin.actualPatientId).subscribe((contactInf) => {
        const contactInfo = contactInf.map((item, index: number) => ({
          id: index,
          fieldList: WorklistResearchTablesHeaderConfig.contactInfo.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          contactInfo
        };
      });
    }
  }
  
  /**
 * load patient payments
 */
  loadPayments(): void {
    if (this.selectedRow) {
      this.researchData.payments = [];
      this.worklistService.getPayments(this.selectedRow.origin.actualPatientId).subscribe((payment) => {
        const payments = payment.map((item, index: number) => ({
          id: item.id,
          payerNumber: item.payerId,
          fieldList: WorklistResearchTablesHeaderConfig.payments.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          payments
        };
      });
    }
  }
  
  /**
* load patient audit Status History
*/
  loadicdCodes(): void {
    if (this.selectedRow) {
      this.researchData.icdCodes = [];
      this.worklistService.getIcdCodes(this.selectedRow.origin.actualPatientId).subscribe((icdCode) => {
        const icdCodes = icdCode.map((item, index: number) => ({
          id: item.id,
          fieldList: WorklistResearchTablesHeaderConfig.icdCodes.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null
        }));
        this.researchData = {
          ...this.researchData,
          icdCodes
        };
      });
    }
  }
  
  /**
   * create/update patient charge code details
   * @param data charge code details
   */
  saveChargeCodeDetails(data: TableModel): void {
    if (this.selectedRow) {
      const details: any = {};
      WorklistResearchTablesHeaderConfig.chargeCodes.fieldList.forEach((f, i) => {
        details[f.sortField as string] = data.fieldList[i].fieldValue;
      });

      if (data.id) {
        this.worklistService
          .updateChargeCodes(this.selectedRow.origin.actualPatientId, data.id, details)
          .subscribe(() => {
            const index = findIndex(this.researchData.chargeCodes, ['id', data.id]);
            if (index >= 0) {
              this.researchData.chargeCodes.splice(index, 1, data);
            }
            this.researchComp?.closeModal();
            this.toastrService.success('Charge code details updated successfully');
          });
      } else {
        this.worklistService.createChargeCodes(this.selectedRow.origin.actualPatientId, details).subscribe((resp) => {
          this.researchData.chargeCodes.push(this.mapChargeCode(resp));
          this.researchComp?.closeModal();
          this.toastrService.success('New charge code details created successfully');
        });
      }
    }
  }
  /**
   * create/update patient charge code details
   * @param data charge code details
   */
  saveContactInfo(data: TableModel): void {
    if (this.selectedRow) {
      const details: any = {};
      WorklistResearchTablesHeaderConfig.contactInfo.fieldList.forEach((f, i) => {
        details[f.sortField as string] = data.fieldList[i].fieldValue;
      });

      if (data.id) {
        this.worklistService
          .updateContactInfo(this.selectedRow.origin.actualPatientId,  details)
          .subscribe(() => {
            const index = findIndex(this.researchData.contactInfo, ['id', data.id]);
            if (index >= 0) {
              this.researchData.contactInfo.splice(index, 1, data);
            }
            this.researchComp?.closeModal();
            this.toastrService.success('Contact info details updated successfully');
          });
      } else {
        this.worklistService.createContactInfo(this.selectedRow.origin.actualPatientId, details).subscribe((resp) => {
          
          this.researchComp?.closeModal();
          this.toastrService.success('New contact info created successfully');
        });
      }
    }
  }
   
  
  /**
   * remove patient charge code details
   * @param data charge code details
   */
  removeChargeCodeDetails(data: TableModel): void {
    if (this.selectedRow) {
      this.worklistService.deleteChargeCodes(this.selectedRow.origin.actualPatientId, data.id).subscribe(() => {
        const index = findIndex(this.researchData.chargeCodes, ['id', data.id]);
        if (index >= 0) {
          this.researchData.chargeCodes.splice(index, 1);
        }
        this.researchComp?.closeModal();
        this.toastrService.success('Charge code details deleted successfully');
      });
    }
  }

  /**
   * show create layout modal
   */
  showLayoutDetailsModal(): void {
    this.modalData['name'] = 'modal-windows-edit-layout';
    this.layoutToEdit = {
      id: 0,
      name: '',
      description: '',
      isDefault: false,
      columns: []
    };
  }

  /**
   * show edit layout modal
   */
  editLayout(): void {
    if (this.selectedLayout) {
      this.modalData['name'] = 'modal-windows-edit-layout';
      this.layoutToEdit = cloneDeep(this.selectedLayout);
    }
  }

  /**
   * create/update layout accordingly
   * @param layout layout details
   */
  saveLayout(layout: LayoutResponse): void {
    if (layout.id) {
      this.updateLayout(layout);
    } else {
      this.createLayout(layout);
    }
  }

  /**
   * create layout
   * @param layout layout details
   */
  createLayout(layout: LayoutResponse): void {
    this.worklistService.createLayout(omit(layout, 'id')).subscribe((resp) => {
      this.modalData['name'] = '';
      this.toastrService.success('Layout created successfully');
      this.layoutOptions.push(resp);
      this.onLayoutChange(resp);
    });
  }

  /**
   * update layout
   * @param layout layout details
   */
  updateLayout(layout: LayoutResponse): void {
    this.worklistService.updateLayout(layout.id, layout).subscribe((resp) => {
      this.modalData['name'] = '';
      this.toastrService.success('Layout updated successfully');
      const index = findIndex(this.layoutOptions, ['id', resp.id]);
      if (index >= 0) {
        this.layoutOptions.splice(index, 1, resp);
        this.onLayoutChange(resp);
      }
    });
  }

  /**
   * set current layout as default
   */
  setDefaultLayout(): void {
    if (this.selectedLayout && !this.selectedLayout.isDefault) {
      this.selectedLayout.isDefault = true;
      this.worklistService.updateLayout(this.selectedLayout.id, this.selectedLayout).subscribe(() => {
        this.toastrService.success('Set layout as default successfully');
      });
    }
  }

  /**
   * show delete layout confirmation modal
   */
  showDeleteLayoutConfirm(): void {
    if (this.selectedLayout) {
      this.modalData['name'] = 'modal-windows-confirm';
      this.confirmModalData = {
        title: 'Delete Confirmation',
        description: 'Are you sure you want to remove the layout?',
        sourceModal: '',
        event: 'Delete-Layout'
      };
    }
  }

  /**
   * delete current layout
   */
  deleteLayout(): void {
    if (this.selectedLayout) {
      this.worklistService.deleteLayout(this.selectedLayout.id).subscribe(() => {
        this.modalData['name'] = '';
        this.toastrService.success('Layout deleted successfully');
        pull(this.layoutOptions, this.selectedLayout);
        this.onLayoutChange(find(this.layoutOptions, ['isDefault', true]) || this.layoutOptions[0]);
      });
    }
  }

  /**
   * logout
   */
  clickLogout(): void {
    this.authService.logout();
  }
}
