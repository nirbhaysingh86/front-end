import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { TableModel } from '../../../model/table.model';

/**
 * This class represents the lazy loaded ModalWindowsIcdCodeDetailsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-icd-code-details',
  templateUrl: 'modal-windows-icd-code-details.component.html',
  styleUrls: ['modal-windows-icd-code-details.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class ModalWindowsIcdCodeDetailsComponent {
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
  @Input() icdVersion: string[] = [];

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  serviceData = null;

  // click Minu of Rank
  clickMinuRank(): void {
    this.dataListDetails.fieldList[4]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[4]['fieldValue'], 10) - 1
    ).toString();
  }

  // click Add of Rank
  clickAddRank(): void {
    this.dataListDetails.fieldList[4]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[4]['fieldValue'], 10) + 1
    ).toString();
  }

  // is Form Valid
  isFormValid(): boolean {
    return (
      this.dataListDetails.fieldList[1]['fieldValue'] !== '' &&
      this.dataListDetails.fieldList[0]['fieldValue'] !== '' &&
      this.dataListDetails.fieldList[2]['fieldValue'] !== '' &&
      this.dataListDetails.fieldList[4]['fieldValue'] !== '' &&
      this.dataListDetails.fieldList[6]['fieldValue'] !== '' &&
      this.serviceData !== null
    );
  }

  /**
   * close Modal
   */
  closeModal(isSave: boolean): void {
    this.closeModalWindow.emit(isSave);
  }
}
