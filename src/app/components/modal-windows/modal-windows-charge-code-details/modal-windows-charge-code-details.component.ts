import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { NgbDateConversion } from '../../../shared/dateConversion';
import { TableModel } from '../../../model/table.model';

/**
 * This class represents the lazy loaded ModalWindowsChargeCodeDetailsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-charge-code-details',
  templateUrl: 'modal-windows-charge-code-details.component.html',
  styleUrls: ['modal-windows-charge-code-details.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class ModalWindowsChargeCodeDetailsComponent implements OnInit {
  @Input() modalData = {
    name: ''
  };
  @Input() dataListDetails: TableModel = {
    id: 0,
    fieldList: [],
    expandData: null,
    checked: false,
    hidden: false
  };

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  serviceDateValue: NgbDateStruct = {
    day: 0,
    month: 0,
    year: 0
  };

  /**
   * Creates an instance of the MyWorklistPageComponent with the injected
   * DataListService.
   */
  constructor(public ngbDateConversion: NgbDateConversion) {}

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.serviceDateValue = this.ngbDateConversion.formatToDate(this.dataListDetails.fieldList[3]['fieldValue']);
  }

  // date Select
  dateSelect(): void {
    this.dataListDetails.fieldList[3]['fieldValue'] = this.ngbDateConversion.formatToStr(this.serviceDateValue);
  }

  // click Minu of Units
  clickMinuUnits(): void {
    this.dataListDetails.fieldList[5]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[5]['fieldValue'] || 0, 10) - 1
    ).toString();
  }

  // click Add of Units
  clickAddUnits(): void {
    this.dataListDetails.fieldList[5]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[5]['fieldValue'] || 0, 10) + 1
    ).toString();
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
