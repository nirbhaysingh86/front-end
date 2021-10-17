export class PatientAccountModel {
  billingInfo: {
    accountNumber: string;
    facility: string;
    service: string;
    admissionDate: string;
    dischargeDate: string;
    billingDate: string;
    primaryGrouperDRG: string;
    stateGrouperDRG: string;
    expandedGrouperDRG: string;
    payerUsedDRG: string;
    aprDRGMortalityID: string;
    aprDRGSeverityID: string;
    standardDRGWeight: string;

    orgCode1: string;
    orgCode2: string;
    patientType: string;
    dischargeType: string;
    admissionSource: string;
    professionalFees: string;
    totalDays: string;
    totalCharges: string;
    surgicalTime: string;
    roomBoard: string;
    skilledNursingUnits: string;
    obsRoomCharges: string;
    obsTime: string;

    recovRmCharges: string;
    recovTime: string;
    revCodeCount: string;
    costServiceCenter: string;
    nonBillableCharges: string;
    billingStatusID: string;
    clinicCategoryID: string;
    facilityServiceID: string;
    programCodeID: string;
    federalTaxID: string;
    stateMHBedDays: string;
  } = {
    accountNumber: '',
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
    professionalFees: '',
    totalDays: '',
    totalCharges: '',
    surgicalTime: '',
    roomBoard: '',
    skilledNursingUnits: '',
    obsRoomCharges: '',
    obsTime: '',

    recovRmCharges: '',
    recovTime: '',
    revCodeCount: '',
    costServiceCenter: '',
    nonBillableCharges: '',
    billingStatusID: '',
    clinicCategoryID: '',
    facilityServiceID: '',
    programCodeID: '',
    federalTaxID: '',
    stateMHBedDays: ''
  };
  demographics: {
    patient: {
      lastName: string;
      firstName: string;
      mi: string;
      suffix: string;
      address: string;
      aptSuite: string;
      city: string;
      state: string;
      zip: string;
      ssn: string;
      dob: string;
      age: string;
      sex: string;
      maritalStatus: string;
      employer: string;
      adultPedsFlag: string;
      patientFileID: string;
    };
    responsibleParty: {
      lastName: string;
      firstName: string;
      mi: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      zip: string;
    };
  } = {
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
  };
  insuredInfo: {
    subsriberID: string;
    claimNumber: string;
    invoiceID: string;
    insuredLastName: string;
    insuredFirstName: string;
    insuredInitial: string;
    insuredGroupName: string;
    relationOfInsured: string;
    insuredSSN: string;
  } = {
    subsriberID: '',
    claimNumber: '',
    invoiceID: '',
    insuredLastName: '',
    insuredFirstName: '',
    insuredInitial: '',
    insuredGroupName: '',
    relationOfInsured: '',
    insuredSSN: ''
  };
}
