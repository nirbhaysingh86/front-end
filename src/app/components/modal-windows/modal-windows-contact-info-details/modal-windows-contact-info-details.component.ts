import { Component, Input, EventEmitter, Output } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { ServiceTypeDropdownOptions, PointOfServiceDropdownOptions, AuditStatusDropdownOptions, AuditorDropdownOptions, ReviewCatDropdownOptions, ReviewRegDropdownOptions, VarianceCatDropdownOptions, ResposibilityDropdownOptions } from '../../../../config/configuration';
import { OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { LookupService } from '../../../shared/services/lookup.service';
import { cloneDeep, forEach } from 'lodash';

/**
 * This class represents the lazy loaded ModalWindowsCombinedRevCptCodeDetailsComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-contact-info-details',
  templateUrl: 'modal-windows-contact-info-details.component.html',
  styleUrls: ['modal-windows-contact-info-details.component.scss']
})
export class ModalWindowsContactInfoDetailsComponent implements OnInit {

  constructor(private lookupService: LookupService) {

  }

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
  selectedLimits: any;
  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  serviceTypeDropdownOptions = ServiceTypeDropdownOptions;
  pointOfServiceDropdownOptions = PointOfServiceDropdownOptions;
  auditStatusDropdownOptions = AuditStatusDropdownOptions;
 
  auditorDropdownOptions :any;

  reviewCatDropdownOptions :any;
  reviewRegDropdownOptions :any;
  varianceCatDropdownOptions: any;
  resposibilityDropdownOptions = ResposibilityDropdownOptions;
  dropDownValues: any[] = [];
  // click Minu of Duration
  clickMinuDuration(): void {
    this.dataListDetails.fieldList[38]['fieldValue'] = (
      parseInt(this.dataListDetails.fieldList[38]['fieldValue'], 10) - 1
    ).toString();
  }

  /**
   * OnInit
   */
  ngOnInit(): void {
    
      //this.paidBySelection = this.paidBy[0];
      forkJoin({
        reviewCategory: this.lookupService.getSystemValues('ReviewCategory'),
        aMAuditorType: this.lookupService.getSystemValues('AMAuditorType'),
        reviewReason: this.lookupService.getSystemValues('ReviewReason'),
        varianceCategory: this.lookupService.getSystemValues('VarianceCategory'),
      })
        .pipe(

        )
        .subscribe((resp) => {
          this.auditorDropdownOptions = cloneDeep(this.mapDropDown(resp.aMAuditorType));
          this.reviewCatDropdownOptions = cloneDeep(this.mapDropDown(resp.reviewCategory));
          this.reviewRegDropdownOptions = cloneDeep(this.mapDropDown(resp.reviewReason));
          this.varianceCatDropdownOptions = cloneDeep(this.mapDropDown(resp.varianceCategory));
        });
    
  }
  mapDropDown(resp:any) {

     resp.forEach((value: any) => {
      this.dropDownValues.push(value.description);
    });
    return this.dropDownValues;
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
