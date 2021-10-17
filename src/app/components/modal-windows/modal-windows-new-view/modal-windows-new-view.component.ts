import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { trim } from 'lodash';
import { SystemValueModel } from '../../../model/systemValue.model';
import { ViewLimitOptionsModel } from '../../../model/viewLimitOptions.model';
import { CreateViewRequestModel } from '../../../model/requests/createViewRequest.model';
import { ViewModel } from '../../../model/view.model';

/**
 * This class represents the lazy loaded ModalWindowsNewViewComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-new-view',
  templateUrl: 'modal-windows-new-view.component.html',
  styleUrls: ['modal-windows-new-view.component.scss']
})
export class ModalWindowsNewViewComponent implements OnInit {
  @Input() modalData = {
    name: ''
  };
  @Input() limitOptions: ViewLimitOptionsModel = {
    auditor: [],
    accountAge: [],
    followUp: [],
    hiddenRecords: [],
    status: []
  };
  @Input() initialValue?: ViewModel;

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();
  @Output() clickCreateView: EventEmitter<CreateViewRequestModel> = new EventEmitter();

  viewName = '';
  description = '';
  checkUseThisAsMyDefaultView = false;

  auditor?: SystemValueModel;
  followUp?: SystemValueModel;
  status?: SystemValueModel;
  accountAge?: SystemValueModel;
  hiddenRecords?: SystemValueModel;

  ngOnInit(): void {
    this.viewName = this.initialValue?.name || '';
    this.description = this.initialValue?.description || '';
    this.checkUseThisAsMyDefaultView = this.initialValue?.isDefault || false;
    this.auditor = this.initialValue?.limits.auditor;
    this.followUp = this.initialValue?.limits.followUp;
    this.status = this.initialValue?.limits.status;
    this.accountAge = this.initialValue?.limits.accountAge;
    this.hiddenRecords = this.initialValue?.limits.hiddenRecords;
  }

  // is Form Valid
  isFormValid(): boolean {
    return trim(this.viewName) !== '' && trim(this.description) !== '';
  }

  /**
   * close Modal
   */
  closeModal(): void {
    this.closeModalWindow.emit();
  }

  /**
   * create new view
   */
  createView(): void {
    this.clickCreateView.emit({
      name: this.viewName,
      description: this.description,
      limits: {
        auditor: this.auditor!.code,
        followUp: this.followUp!.code,
        status: this.status!.code,
        accountAge: this.accountAge!.code,
        hiddenRecords: this.hiddenRecords!.code
      },
      isDefault: this.checkUseThisAsMyDefaultView
    });
  }
}
