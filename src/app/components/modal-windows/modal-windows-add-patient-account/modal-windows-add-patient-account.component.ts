import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataListService } from '../../../shared/services/data-list.service';
import { PatientAccountModel } from '../../../model/patientAccount.model';
import {
  SexOptions,
  StateOptions,
  MaritalStatusDropdownOptions,
  EmployerDropdownOptions
} from '../../../../config/configuration';

/**
 * This class represents the lazy loaded ModalWindowsAddPatientAccountComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-add-patient-account',
  templateUrl: 'modal-windows-add-patient-account.component.html',
  styleUrls: ['modal-windows-add-patient-account.component.scss']
})
export class ModalWindowsAddPatientAccountComponent implements OnInit {
  @Input() modalData = {
    name: ''
  };

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  dataListLookups: any = {};

  tabIndex = 0;

  sexOptions = SexOptions;
  stateOptions = StateOptions;
  maritalStatusDropdownOptions = MaritalStatusDropdownOptions;
  employerDropdownOptions = EmployerDropdownOptions;

  dataListPatientAccount: PatientAccountModel = {
    billingInfo: {
      accountNumber: '123456789',
      facility: '',
      service: '',
      admissionDate: '',
      dischargeDate: '',
      billingDate: '',
      primaryGrouperDRG: '',
      stateGrouperDRG: '',
      expandedGrouperDRG: '',
      payerUsedDRG: '',
      aprDRGMortalityID: '',
      aprDRGSeverityID: '',
      standardDRGWeight: '',

      orgCode1: '',
      orgCode2: '',
      patientType: '',
      dischargeType: '',
      admissionSource: '',
      professionalFees: '$0.00',
      totalDays: '',
      totalCharges: '$0.00',
      surgicalTime: '',
      roomBoard: '$0.00',
      skilledNursingUnits: '',
      obsRoomCharges: '$0.00',
      obsTime: '',

      recovRmCharges: '$0.00',
      recovTime: '',
      revCodeCount: '0',
      costServiceCenter: '',
      nonBillableCharges: '$0.00',
      billingStatusID: '',
      clinicCategoryID: '',
      facilityServiceID: '',
      programCodeID: '',
      federalTaxID: '',
      stateMHBedDays: '0'
    },
    demographics: {
      patient: {
        lastName: '',
        firstName: '',
        mi: '',
        suffix: '',
        address: '',
        aptSuite: '',
        city: '',
        state: '',
        zip: '',
        ssn: '',
        dob: '',
        age: '',
        sex: '',
        maritalStatus: '',
        employer: '',
        adultPedsFlag: '',
        patientFileID: ''
      },
      responsibleParty: {
        lastName: '',
        firstName: '',
        mi: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: ''
      }
    },
    insuredInfo: {
      subsriberID: '',
      claimNumber: '',
      invoiceID: '',
      insuredLastName: '',
      insuredFirstName: '',
      insuredInitial: '',
      insuredGroupName: '',
      relationOfInsured: '',
      insuredSSN: ''
    }
  };

  /**
   * Creates an instance of the ModalWindowsAddPatientAccountComponent with the injected
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
  }

  // click Minu of Rev Code Count
  clickMinuRevCodeCount(): void {
    this.dataListPatientAccount.billingInfo.revCodeCount = (
      parseInt(this.dataListPatientAccount.billingInfo.revCodeCount, 10) - 1
    ).toString();
  }

  // click Add of Rev Code Count
  clickAddRevCodeCount(): void {
    this.dataListPatientAccount.billingInfo.revCodeCount = (
      parseInt(this.dataListPatientAccount.billingInfo.revCodeCount, 10) + 1
    ).toString();
  }

  // click Minu of State MH Bed Days
  clickMinuStateMHBedDays(): void {
    this.dataListPatientAccount.billingInfo.stateMHBedDays = (
      parseInt(this.dataListPatientAccount.billingInfo.stateMHBedDays, 10) - 1
    ).toString();
  }

  // click Add of State MH Bed Days
  clickAddStateMHBedDays(): void {
    this.dataListPatientAccount.billingInfo.stateMHBedDays = (
      parseInt(this.dataListPatientAccount.billingInfo.stateMHBedDays, 10) + 1
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
