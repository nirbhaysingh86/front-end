import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { ServiceTypeDropdownOptions, PointOfServiceDropdownOptions, AuditStatusDropdownOptions, AuditorDropdownOptions, ReviewCatDropdownOptions, ReviewRegDropdownOptions, VarianceCatDropdownOptions, ResposibilityDropdownOptions } from '../../../../config/configuration';

/**
 * This class represents the lazy loaded ModalWindowsCombinedRevCptCodeDetailsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-contact-info-details',
  templateUrl: 'modal-windows-contact-info-details.component.html',
  styleUrls: ['modal-windows-contact-info-details.component.scss']
})
export class ModalWindowsContactInfoDetailsComponent {
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
  auditStatusDropdownOptions = AuditStatusDropdownOptions;
  auditorDropdownOptions = AuditorDropdownOptions;
  reviewCatDropdownOptions = ReviewCatDropdownOptions;
  reviewRegDropdownOptions = ReviewRegDropdownOptions;
  varianceCatDropdownOptions = VarianceCatDropdownOptions;
  resposibilityDropdownOptions = ResposibilityDropdownOptions;
  // click Minu of Duration
  clickMinuDuration(): void {
    this.dataListDetails.fieldList[38]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[38]['fieldValue'], 10) - 1
    ).toString();
  }

  // click Add of Duration
  clickAddDuration(): void {
    this.dataListDetails.fieldList[38]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[38]['fieldValue'], 10) + 1
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
