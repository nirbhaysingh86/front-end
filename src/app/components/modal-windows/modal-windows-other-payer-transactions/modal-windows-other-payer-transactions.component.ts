import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataListMyWorklistResearchService } from '../../../shared/services/data-list-my-worklist-research.service';
import { TableModel } from '../../../model/table.model';
import { TransactionFileTypeDropdownOptions, WorklistResearchPaymentOtherHeaderConfig } from '../../../../config/configuration';
import { forkJoin, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { cloneDeep, find, findIndex, get, omit, trim, uniqBy, pull } from 'lodash';
import { ResearchDataModalPaymentOtherHeaderModel, ResearchTablesDataModelPaymentOtherModel } from '../../../model/researchTables.model';
import { WorklistService } from '../../../shared/services/worklist.service';
import { ToastrService } from 'ngx-toastr';
import { MyWorklistResearchComponent } from '../../my-worklist-research/my-worklist-research.component';
/**
 * This class represents the lazy loaded ModalWindowsOtherPayerTransactionsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-other-payer-transactions',
  templateUrl: 'modal-windows-other-payer-transactions.component.html',
  styleUrls: ['modal-windows-other-payer-transactions.component.scss']
})
export class ModalWindowsOtherPayerTransactionsComponent implements OnInit {
  @Input() modalData = {
    name: ''
  };
  @Input() paymentModalData: any;
  @Input() isSaveTransEnable: any;
  @Output() clickDeleteTransactions: EventEmitter<any> = new EventEmitter();
  @Output() clickCommitTransactions: EventEmitter<any> = new EventEmitter();
  @Output() saveOtherTransactions: EventEmitter<any> = new EventEmitter();
  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedForDeleteRowData: any;
  @Input() isSuccessModalClicked: any;
  @ViewChild(MyWorklistResearchComponent) researchComp?: MyWorklistResearchComponent;

  transactionFileTypeDropdownOptions = TransactionFileTypeDropdownOptions;
  selectedRow?: TableModel;
  isRowSelected: any;
  transactionFileTypeSelection = '';

  dataList: TableModel[] = [];
  researchData: ResearchTablesDataModelPaymentOtherModel = {

    paymentDetailsOther: []
  };
  /**
   * Creates an instance of the ModalWindowsOtherPayerTransactionsComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListMyWorklistResearchService, public worklistService: WorklistService, private toastrService: ToastrService) {}
  headers: ResearchDataModalPaymentOtherHeaderModel = WorklistResearchPaymentOtherHeaderConfig;

  /**
   * OnInit
   */
  ngOnInit(): void {
    //this.dataListService.getMyWorklistResearchPaymentAdjustmentsTabOtherPayerTransactionsData().subscribe((data) => {
    //  this.dataList = data;

    //  this.updateFilter();
    //});
    if (this.isSaveTransEnable) {
      this.saveTransaction();
    }
    else if (this.isSuccessModalClicked) {
      this.commitTransaction();
    } else {
      this.loadOtherPaymentDetails();
      this.transactionFileTypeSelection = this.transactionFileTypeDropdownOptions[0];
    }
  }

  /**
   * Load other payment
   */
  loadOtherPaymentDetails(): void {
    if (this.paymentModalData) {
      this.researchData.paymentDetailsOther = [];
      this.worklistService.getOtherPayerTransactions(this.paymentModalData.id).subscribe((paymentDetail) => {
        const paymentDetailsOther = paymentDetail.map((item,  index: number) => ({
          id: !item.id ? index : item.id,
          fieldList: WorklistResearchPaymentOtherHeaderConfig.paymentDetailsOther.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null,
          payerNumber: item.payerNumber
        }));
        this.researchData = {
          ...this.researchData,
          paymentDetailsOther
        };
        this.dataList = this.researchData.paymentDetailsOther;
        //this.updateFilter();
      });

    }
  }
  //Get selected row values
  getSelectedRowValues(data: any) {
    this.selectedRow = data;
    this.isRowSelected = true;
  }
  /**
  * commit patient transaction detail
   * @param data patient id details
  *  * @param data payer number details
  */
  commitTransaction(): void {
    if (this.selectedForDeleteRowData) {
      this.worklistService.commitTransaction(this.selectedForDeleteRowData.actualPatientId, this.selectedForDeleteRowData.payerNumber).subscribe(() => {
        this.loadOtherPaymentDetails();
        this.researchComp?.closeModal();
        this.toastrService.success('Payment commited successfully');
      });
    }
  }
  /**
 * commit patient transaction detail
  * @param data patient id details
 *  * @param data payer number details
 */
  saveTransaction(): void {
    if (this.selectedForDeleteRowData) {
      this.worklistService.saveOtherTransaction(this.selectedForDeleteRowData.actualPatientId, this.selectedForDeleteRowData).subscribe(() => {
        this.loadOtherPaymentDetails();
        this.researchComp?.closeModal();
        this.toastrService.success('Payment commited successfully');
      });
    }
  }
  // update Filter
  updateFilter(): void {
    this.dataList.forEach((item, index) => {
      let matched = true;
      if (item.fieldList[9].fieldValue !== this.transactionFileTypeSelection) {
        matched = false;
      }

      item.hidden = !matched;
    });
  }

  // is Form Valid
  isFormValid(): boolean {
    return true;
  }

  /**
   * close Modal
   */
  closeModal(isSave: boolean): void {
    this.closeModalWindow.emit(isSave);
  }

  /**
   * selected Row Number
   */
  selectedRowNumber(): number {
    let selectedNumber = 0; // 0
    this.dataList.forEach((item, index) => {
      if (item.checked) {
        selectedNumber++;
      }
    });

    return selectedNumber;
  }
}
