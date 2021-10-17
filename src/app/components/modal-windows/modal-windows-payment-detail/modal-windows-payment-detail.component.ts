import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataListMyWorklistResearchService } from '../../../shared/services/data-list-my-worklist-research.service';
import { TableModel } from '../../../model/table.model';
import {   WorklistResearchPaymentDetailsHeaderConfig } from '../../../../config/configuration';
import {   ResearchDataModalPaymentDetailHeaderModel, ResearchTablesDataModelPaymentDetailModel} from '../../../model/researchTables.model';
import { forkJoin, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { cloneDeep, find, findIndex, get, omit, trim, uniqBy, pull } from 'lodash';
import { ResearchViewLimitOptionsModel } from '../../../model/viewLimitOptions.model';
import { LookupService } from '../../../shared/services/lookup.service';
import { ViewLimitsModel } from '../../../model/viewLimits.model';
import { WorklistService } from '../../../shared/services/worklist.service';
import { ToastrService } from 'ngx-toastr';
import { MyWorklistResearchComponent } from '../../my-worklist-research/my-worklist-research.component';
/**
 * This class represents the lazy loaded ModalWindowsPaymentDetailComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-payment-detail',
  templateUrl: 'modal-windows-payment-detail.component.html',
  styleUrls: ['modal-windows-payment-detail.component.scss']
})
export class ModalWindowsPaymentDetailComponent implements OnInit {
  @Input() modalData = {
    name: '',
  };
  @Input() isSuccessModalClicked: any;
  @Input() paymentModalData : any;
   
  @Input() paidBy = [] as string[];
  @Input() paymentType = [] as string[];
  @Input() payerNumber = [] as string[];
  selectedRow?: TableModel;
  @Input() selectedForDeleteRowData: any;
  @Output() clickDeletePayment: EventEmitter<any> = new EventEmitter();
  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();
  isRowSelected: any;
  paidBySelection = '';
  paymentTypeSelection: any;
  
  dataList: TableModel[] = [];
  researchData: ResearchTablesDataModelPaymentDetailModel = {
   paymentDetails: []
  };

  viewLimitOptions: ResearchViewLimitOptionsModel = {
    paymentStatus: [],
  };
  selectedLimits: any = {};
  /**
   * Creates an instance of the ModalWindowsPaymentDetailComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListMyWorklistResearchService, public worklistService: WorklistService, private lookupService: LookupService, private toastrService: ToastrService) { }

  headers: ResearchDataModalPaymentDetailHeaderModel = WorklistResearchPaymentDetailsHeaderConfig;
  @ViewChild(MyWorklistResearchComponent) researchComp?: MyWorklistResearchComponent;

  /**
   * OnInit
   */
  ngOnInit(): void {
    if (this.isSuccessModalClicked) {
      this.removePaymentDetails();
    } else {
      this.loadPaymentDetails();

      //this.paidBySelection = this.paidBy[0];
      forkJoin({

        paymentStatus: this.lookupService.getSystemValues('PaymentStatus')
      })
        .pipe(

        )
        .subscribe((resp) => {
          this.selectedLimits = {
            paymentStatus: { code: 0, description: 'All Records' }
          };
          this.viewLimitOptions.paymentStatus = resp.paymentStatus;
        });
    }
  }

  /**
   * get patient payment details
   * @param data patient id details
   *  * @param data payer number details
   */
  loadPaymentDetails(): void {
    if (this.paymentModalData) {
      this.researchData.paymentDetails = [];
      this.worklistService.getPaymentDetails(this.paymentModalData.id, this.paymentModalData.payerNumber).subscribe((paymentDetail) => {
        const paymentDetails = paymentDetail.map((item) => ({
          id: item.id,
          fieldList: WorklistResearchPaymentDetailsHeaderConfig.paymentDetails.fieldList.map((f) => ({
            fieldValue: get(item, f.sortField as string)
          })),
          checked: false,
          hidden: false,
          expandData: null,
          payerNumber: item.payerNumber,
        }));
        this.researchData = {
          ...this.researchData,
          paymentDetails
        };
        this.dataList = this.researchData.paymentDetails;
        //this.updateFilter();
      });
      
    }
  }

  /**
   * remove patient charge code details
    * @param data patient id details
   *  * @param data payer number details
   */
  removePaymentDetails(): void {
    if (this.selectedForDeleteRowData) {
      this.worklistService.deletePaymentDetails(this.selectedForDeleteRowData.actualPatientId, this.selectedForDeleteRowData.payerNumber).subscribe(() => {
        const index = findIndex(this.researchData.paymentDetails, ['id', this.selectedForDeleteRowData.id]);
        if (index >= 0) {
          this.researchData.paymentDetails.splice(index, 1);
        }
        this.researchComp?.closeModal();
        this.toastrService.success('Payment details deleted successfully');
      });
    }
  }
  //Get selected row values
  getSelectedRowValues(data: any) {
    this.selectedRow = data;
    this.isRowSelected = true;
  }

  // update Filter
  updateFilter(): void {
    this.dataList.forEach((item, index) => {
      let matched = true;
      if (item.fieldList[0].fieldValue !== this.paidBySelection) {
        matched = false;
      }

      if (this.paymentTypeSelection !== 'All') {
        if (item.fieldList[1].fieldValue !== this.paymentTypeSelection) {
          matched = false;
        }
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

  
}
