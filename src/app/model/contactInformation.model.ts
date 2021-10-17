export class ContactInformationModel {
  insuranceInformation: {
    facilityName: string;
    taxID: string;
    npi: string;
    payeeName: string;
    payerPhone: string;
    subscriberID: string;
    insuredSSN: string;
    insuredGroupName: string;
  } = {
    facilityName: '',
    taxID: '',
    npi: '',
    payeeName: '',
    payerPhone: '',
    subscriberID: '',
    insuredSSN: '',
    insuredGroupName: ''
  };
  visitInformation: {
    patientName: string;
    dateOfBirth: string;
    accountNumber: string;
    totalCharges: string;
    insuredName: string;
    admitDate: string;
    dischargeDate: string;
    patientType: string;
    medicalRecordNo: string;
    socialSecurityNo: string;
  } = {
    patientName: '',
    dateOfBirth: '',
    accountNumber: '',
    totalCharges: '',
    insuredName: '',
    admitDate: '',
    dischargeDate: '',
    patientType: '',
    medicalRecordNo: '',
    socialSecurityNo: ''
  };
  recoveryInformation: {
    auditStatus: string;
    reviewCateogry: string;
    varianceCategory: string;
    closedResult: string;
    committedAmount: string;
    assignedReviewer: string;
    auditor: string;
    reviewReason: string;
    varCatSuggestion: string;
    closedReason: string;
    pursuingReason: string;
    follwUpDate: string;
    eventDate: string;
    startDate: string;
    agency: string;
    reviewStage: string;
    argument: string;
  } = {
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
    pursuingReason: '',
    follwUpDate: '',
    eventDate: '',
    startDate: '',
    agency: '',
    reviewStage: '',
    argument: ''
  };
  contactLog: {
    responsibility: string;
    type: string;
    duration: string;
    note: string;
  } = {
    responsibility: '',
    type: '',
    duration: '',
    note: ''
  };
}
