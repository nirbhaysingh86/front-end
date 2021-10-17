import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataListService } from '../../../shared/services/data-list.service';
import { ContactInformationModel } from '../../../model/contactInformation.model';
import { AuditStatusDropdownOptions, ContactTypeDropdownOptions } from '../../../../config/configuration';

/**
 * This class represents the lazy loaded ModalWindowsContactInformationComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-contact-information',
  templateUrl: 'modal-windows-contact-information.component.html',
  styleUrls: ['modal-windows-contact-information.component.scss']
})
export class ModalWindowsContactInformationComponent implements OnInit {
  @Input() modalData = {
    name: ''
  };

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  auditStatusDropdownOptions = AuditStatusDropdownOptions;
  contactTypeDropdownOptions = ContactTypeDropdownOptions;

  dataListLookups: any = {};
  dataListContactInformation: ContactInformationModel = {
    insuranceInformation: {
      facilityName: '',
      taxID: '',
      npi: '',
      payeeName: '',
      payerPhone: '',
      subscriberID: '',
      insuredSSN: '',
      insuredGroupName: ''
    },
    visitInformation: {
      patientName: '',
      dateOfBirth: '',
      accountNumber: '',
      totalCharges: '$0.00',
      insuredName: '',
      admitDate: '',
      dischargeDate: '',
      patientType: '',
      medicalRecordNo: '',
      socialSecurityNo: ''
    },
    recoveryInformation: {
      auditStatus: '',
      reviewCateogry: '',
      varianceCategory: '',
      closedResult: '',
      committedAmount: '',
      assignedReviewer: '',
      auditor: '',
      reviewReason: '',
      varCatSuggestion: '',
      closedReason: '',
      pursuingReason: '$0.00',
      follwUpDate: '',
      eventDate: '',
      startDate: '',
      agency: '',
      reviewStage: '',
      argument: ''
    },
    contactLog: {
      responsibility: '',
      type: '',
      duration: '',
      note: ''
    }
  };

  /**
   * Creates an instance of the MyWorklistPageComponent with the injected
   * DataListService.
   */
  constructor(public dataListService: DataListService) {}

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.dataListService.getLookupsData().subscribe((data) => {
      this.dataListLookups = data;
    });

    this.dataListService.getContactInformationData().subscribe((data: ContactInformationModel) => {
      this.dataListContactInformation = data;
    });
  }

  // click Minu of Duration
  clickMinuDuration(): void {
    this.dataListContactInformation.contactLog.duration = (
      parseInt(this.dataListContactInformation.contactLog.duration, 10) - 1
    ).toString();
  }

  // click Add of Duration
  clickAddDuration(): void {
    this.dataListContactInformation.contactLog.duration = (
      parseInt(this.dataListContactInformation.contactLog.duration, 10) + 1
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
