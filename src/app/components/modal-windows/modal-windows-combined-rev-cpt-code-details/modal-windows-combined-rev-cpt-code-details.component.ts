import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { ServiceTypeDropdownOptions, PointOfServiceDropdownOptions } from '../../../../config/configuration';

/**
 * This class represents the lazy loaded ModalWindowsCombinedRevCptCodeDetailsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-combined-rev-cpt-code-details',
  templateUrl: 'modal-windows-combined-rev-cpt-code-details.component.html',
  styleUrls: ['modal-windows-combined-rev-cpt-code-details.component.scss']
})
export class ModalWindowsCombinedRevCptCodeDetailsComponent {
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
  @Input() modifier = [] as string[];

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  serviceTypeDropdownOptions = ServiceTypeDropdownOptions;
  pointOfServiceDropdownOptions = PointOfServiceDropdownOptions;

  // click Minu of Units
  clickMinuUnits(): void {
    this.dataListDetails.fieldList[7]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[7]['fieldValue'], 10) - 1
    ).toString();
  }

  // click Add of Units
  clickAddUnits(): void {
    this.dataListDetails.fieldList[7]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[7]['fieldValue'], 10) + 1
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
