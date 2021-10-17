import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DataListMyWorklistResearchService } from '../../shared/services/data-list-my-worklist-research.service';
import { TableModel } from '../../model/table.model';
import { TableOptionActionModel } from '../../model/tableOptionAction.model';
import { ResearchTablesDataModel, ResearchTablesHeaderModel } from '../../model/researchTables.model';
import { ResearchTabArray, WorklistResearchTablesHeaderConfig } from '../../../config/configuration';

/**
 * This class represents the lazy loaded MyWorklistResearchComponent.
 */
@Component({
  selector: 'app-sd-my-worklist-research',
  templateUrl: 'my-worklist-research.component.html',
  styleUrls: ['my-worklist-research.component.scss']
})
export class MyWorklistResearchComponent implements OnInit {
  @Input() researchTabIndex = 0;
  @Input() dataListLookups: any = {};
  @Input() selectedOrginRow: any;

  @Input() data: ResearchTablesDataModel = {
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

  @Output() clickTab: EventEmitter<number> = new EventEmitter();
  @Output() saveChargeCodeDetails: EventEmitter<TableModel> = new EventEmitter();
  @Output() saveContactInfo: EventEmitter<TableModel> = new EventEmitter();
  @Output() removeChargeCodeDetails: EventEmitter<TableModel> = new EventEmitter();

  headers: ResearchTablesHeaderModel = WorklistResearchTablesHeaderConfig;

  dataListResearchAuditStatusHistoryTab: TableModel[] = [];
  dataListResearchDetailReimbTab: TableModel[] = [];
  dataListResearchIcdCodesTab: TableModel[] = [];
  dataListResearchPaymentAdjustmentsTab: TableModel[] = [];
  selectedForDeleteRowData: any;
  dataListDetails: TableModel = {
    id: 0,
    fieldList: [],
    expandData: null,
    checked: false,
    hidden: false
  };
  paymentModalData: {
    paymentData: any
  } = { paymentData: '' };

  isSuccessModalClicked: any;
  isSaveTransEnable: any;
  modalData = {
    name: '' // 'modal-windows-payment-detail', 'modal-windows-other-payer-transactions',

  };

  confirmModalData: {
    title: string;
    description: string;
    sourceModal: string;
    event: any;
  } = {
      title: '',
      description: '',
      sourceModal: '',
      event: {
        action: ''
      }
    };


  researchTabArray = ResearchTabArray;

  /**
   * Creates an instance of the MyWorklistPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListMyWorklistResearchService) { }

  /**
   * OnInit
   */
  ngOnInit(): void {
    // this.dataListService.getMyWorklistResearchAuditStatusHistoryTabData().subscribe((data: TableModel[]) => {
    //   this.dataListResearchAuditStatusHistoryTab = data;
    // });
    // this.dataListService.getMyWorklistResearchDetailReimbTabData().subscribe((data: TableModel[]) => {
    //   this.dataListResearchDetailReimbTab = data;
    // });
    // this.dataListService.getMyWorklistResearchIcdCodesTabData().subscribe((data: TableModel[]) => {
    //   this.dataListResearchIcdCodesTab = data;
    // });
    // this.dataListService.getMyWorklistResearchPaymentAdjustmentsTabData().subscribe((data: TableModel[]) => {
    //   this.dataListResearchPaymentAdjustmentsTab = data;
    // });
  }

  /**
   * click Prev arrow
   */
  clickPrev(): void {
    this.clickTab.emit(this.researchTabIndex - 1);
  }

  /**
   * click Next arrow
   */
  clickNext(): void {
    this.clickTab.emit(this.researchTabIndex + 1);
  }

  // click Table Options
  clickTableOptions(event: TableOptionActionModel): void {
    switch (event.action) {
      case 'Add Revenue/CPT':
        this.modalData.name = 'modal-windows-add-revenue-cpt';
        break;
      case 'Remove Revenue/CPT':
        this.modalData['name'] = 'modal-windows-confirm';
        this.confirmModalData = {
          title: 'Delete Confirmation',
          description: 'Are you sure you want to remove the record?',
          sourceModal: '',
          event
        };
        break;
      case 'Combined Rev/CPT Code Details':
        this.modalData.name = 'modal-windows-combined-rev-cpt-code-details';
        break;
      case 'Add Charge Code':
        this.modalData.name = 'modal-windows-charge-code-details';
        this.dataListDetails = {
          id: 0,
          fieldList: WorklistResearchTablesHeaderConfig.chargeCodes.fieldList.map(() => ({
            fieldValue: ''
          })),
          expandData: null,
          checked: false,
          hidden: false
        };
        break;
      case 'Remove Charge Code':
        this.modalData['name'] = 'modal-windows-confirm';
        this.confirmModalData = {
          title: 'Delete Confirmation',
          description: 'Are you sure you want to remove the record?',
          sourceModal: '',
          event
        };
        break;
      case 'Payment Detail':
        this.modalData.name = 'modal-windows-payment-detail';

        break;
      case 'Other Payer Transactions':
        this.modalData.name = 'modal-windows-other-payer-transactions';
        break;
      case 'ICD Code Details':
        this.modalData.name = 'modal-windows-icd-code-details';
        break;
      case 'Payment Details Popup':
        this.modalData.name = 'modal-windows-payment-detail';
        this.paymentModalData.paymentData = event.data;
        break;
      case 'Other Payer Popup':
        this.modalData.name = 'modal-windows-other-payer-transactions';
        this.paymentModalData.paymentData = event.data;
        break;
      default:
        break;
    }
  }

  // click Delete Transactions
  clickDeleteTransactions(event: any): void {
    this.modalData['name'] = 'modal-windows-confirm';
    this.confirmModalData = {
      title: 'Delete Confirmation',
      description: 'Are you sure you want to remove the transaction?',
      sourceModal: 'modal-windows-other-payer-transactions',
      event: {
        action: 'Remove Transaction'
      }
    };
  }

  // click Commit Transactions
  clickCommitTransactions(event: any): void {
    this.selectedForDeleteRowData = event;
    this.selectedForDeleteRowData['actualPatientId'] = this.selectedOrginRow.origin.actualPatientId;
    this.modalData['name'] = 'modal-windows-confirm';
    this.confirmModalData = {
      title: 'Commit Transaction',
      description: 'Are you sure you want to commit the transaction?',
      sourceModal: 'modal-windows-other-payer-transactions',
      event: {
        action: 'Commit Transaction'
      }
    };
  }
  // click Commit Transactions
  saveOtherTransactions(event: any): void {
    this.selectedForDeleteRowData = event;
    this.selectedForDeleteRowData['actualPatientId'] = this.selectedOrginRow.origin.actualPatientId;
    this.modalData['name'] = 'modal-windows-confirm';
    this.confirmModalData = {
      title: 'Save Transaction',
      description: 'Are you sure you want to save the transaction?',
      sourceModal: 'modal-windows-other-payer-transactions',
      event: {
        action: 'Save Transaction'
      }
    };
  }

  // click Delete Payment
  clickDeletePayment(event: any): void {
    this.selectedForDeleteRowData = event;
    this.selectedForDeleteRowData['actualPatientId'] = this.selectedOrginRow.origin.actualPatientId;
    this.modalData['name'] = 'modal-windows-confirm';
    this.confirmModalData = {
      title: 'Delete Confirmation',
      description: 'Are you sure you want to remove the payment?',
      sourceModal: 'modal-windows-payment-detail',
      event: {
        action: 'Remove Payment Details'
      }
    };
  }

  // show Rev CPT Detail Modal
  showRevCPTDetailModal(dataListTab: TableModel[], rowIndex: number): void {
    this.modalData['name'] = 'modal-windows-combined-rev-cpt-code-details';
    this.dataListDetails = cloneDeep(dataListTab[rowIndex]);
  }
  // show contact info Detail Modal
  showContactInfoModal(dataListTab: TableModel[], rowIndex: number): void {
    this.modalData['name'] = 'modal-windows-contact-info-details';
    this.dataListDetails = cloneDeep(dataListTab[rowIndex]);
  }

  // show Charge Code Detail Modal
  showChargeCodeDetailModal(dataListTab: TableModel[], rowIndex: number): void {
    this.dataListDetails = cloneDeep(dataListTab[rowIndex]);
    this.modalData['name'] = 'modal-windows-charge-code-details';
  }

  // show Icd Codes Detail Modal
  showIcdCodesDetailModal(dataListTab: TableModel[], rowIndex: number): void {
    this.modalData['name'] = 'modal-windows-icd-code-details';
    this.dataListDetails = cloneDeep(dataListTab[rowIndex]);
  }

  /**
   * close Modal Window
   */
  closeModalWindow(isSave: boolean, modalName: string): void {
    this.isSuccessModalClicked = false;
    this.isSaveTransEnable = false;
    if (isSave) {
      switch (modalName) {
        case 'modal-windows-confirm':
          if (['Remove Payment Details', 'Commit Transaction'].indexOf(this.confirmModalData.event.action)>=0) {
            this.isSuccessModalClicked = true;
          }
          if (['Save Transaction'].indexOf(this.confirmModalData.event.action) >= 0) {
            this.isSaveTransEnable = true;
          }
          if (this.confirmModalData.event.action === 'Remove Charge Code') {
            this.removeChargeCodeDetails.emit(this.confirmModalData.event.data);
          }
          else {
            this.modalData['name'] = this.confirmModalData.sourceModal;
          }
          break;
        case 'modal-windows-charge-code-details':
          this.saveChargeCodeDetails.emit(this.dataListDetails);
          break;
        case 'modal-windows-contact-info-details':
          this.saveContactInfo.emit(this.dataListDetails);
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

  /**
   * close modal, will be called outside to control the visibility of modal
   */
  public closeModal(): void {
    if (this.modalData['name'] === 'modal-windows-confirm') {
      this.modalData['name'] = this.confirmModalData.sourceModal;
    } else {
      this.modalData['name'] = '';
    }
  }
}
