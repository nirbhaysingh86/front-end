import { ResearchDataModalPaymentDetailHeaderModel,  ResearchDataModalPaymentOtherHeaderModel,  ResearchTablesHeaderModel } from '../app/model/researchTables.model';

export const ResearchTabArray = [
  'Rev/CPT Detail',
  'Charge Code Detail',
  'Claims History',
  'Professional Claims',
  'Payment & Adjustments',
  'ICD Codes',
  'Special Care',
  'Codes',
  'HIPPS Codes',
  'Billing Indicators',
  'EOR',
  'Detail Reimb',
  'Physicians',
  'UR Authorizations',
  'Patient Account Notes',
  'Audit Status History',
  'View Rules',
  'Action History',
  'Invoice Detail',
  'Contact Info'
];

export const PagePerNumberViewAdministrationDropdownOptions = ['15 per page', '50 per page', '100 per page'];

export const PagePerNumberMyWorklistDropdownOptions = ['10 per page', '20 per page', '50 per page', '100 per page'];

export const CostDropdownOptions = ['Between', 'Equal To', 'Greater Than', 'Less Than'];

export const DateDropdownOptions = ['Date Range'];

export const DateTimeDropdownOptions = ['Date Time Range'];

export const TimeHourDropdownOptions = [
  '00:00 am',
  '01:00 am',
  '02:00 am',
  '03:00 am',
  '04:00 am',
  '05:00 am',
  '06:00 am',
  '07:00 am',
  '08:00 am',
  '09:00 am',
  '10:00 am',
  '11:00 am',
  '12:00 am',
  '01:00 pm',
  '02:00 pm',
  '03:00 pm',
  '04:00 pm',
  '05:00 pm',
  '06:00 pm',
  '07:00 pm',
  '08:00 pm',
  '09:00 pm',
  '10:00 pm',
  '11:00 pm'
];

export const PercentDropdownOptions = ['Between', 'Equal To', 'Greater Than', 'Less Than'];

export const TextNameLeftDropdownOptions = ['Begins with', 'Ends with', 'Contains'];

export const TextNameRightDropdownOptions = ['Single value', 'Between'];

export const TextStateLeftDropdownOptions = ['Multi-select'];

export const TextStateRightDropdownOptions = ['Include Selected Value', 'Exclude Selected Value'];

export const StateOptions = [
  'California',
  'New York',
  'Indiana',
  'New Delhi',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Georgia'
];

export const SexOptions = ['Male', 'Female', 'Unknown'];

export const MaritalStatusDropdownOptions = ['Married', 'Unmarried'];

export const EmployerDropdownOptions = ['Acme', 'Option 1', 'Option 2'];

export const ServiceTypeDropdownOptions = ['H', 'M', 'L'];

export const PointOfServiceDropdownOptions = ['Option 1', 'Option 2'];

export const AuditStatusDropdownOptions = ['Pending', 'Closed'];

export const ContactTypeDropdownOptions = [' Automated Variable', 'Option 1', 'Option 2'];
export const AuditorDropdownOptions = ['Unassigned', 'Assigned'];
export const ReviewCatDropdownOptions = ['Cat1', 'Cat2'];
export const ReviewRegDropdownOptions = ['Unassigned', 'Assigned'];
export const VarianceCatDropdownOptions = ['Cat1', 'Cat2'];
export const ResposibilityDropdownOptions = ['Payer 1', 'Payer 2'];


export const TransactionFileTypeDropdownOptions = [
  'Inpatient Payment',
  'Outpatient Payment',
  'Combined Inpat/Outpat Payments',
  'Combined Inpat/Outpat Claim Adjustment File'
];

export const PayerIDDropdownOptions = ['P123', 'P456', 'P789'];

export const PublicEndpoints = ['auth/login'];

export const Roles = {
  siteAdmin: 'Site Admin',
  accountManagement: 'Account Management'
};

export const DateFormat = 'MM/DD/YYYY';

export const WorklistResearchTablesHeaderConfig: ResearchTablesHeaderModel = {
  revCpt: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'RCT Code',
        sortField: 'revenueCode',
        hasCheckAll: false,
        columnWidth: 100,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'Rev Code Descr',
        sortField: 'revenueCodeDescription',
        hasCheckAll: false,
        columnWidth: 166,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'CPT Code',
        sortField: 'cptCode',
        hasCheckAll: false,
        columnWidth: 100,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Modifier One',
        sortField: 'modifier1',
        hasCheckAll: false,
        columnWidth: 90,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Modifier Two',
        sortField: 'modifier2',
        hasCheckAll: false,
        columnWidth: 90,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'CPT Description',
        sortField: 'cptCodeDescription',
        hasCheckAll: false,
        columnWidth: 166,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Service Date',
        sortField: 'serviceDate',
        hasCheckAll: false,
        columnWidth: 90,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Units',
        sortField: 'units',
        hasCheckAll: false,
        columnWidth: 100,
        footerContent: 'number'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Charges',
        sortField: 'charges',
        hasCheckAll: false,
        columnWidth: 100,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Denied Charges',
        sortField: 'deniedCharges',
        hasCheckAll: false,
        columnWidth: 100,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Non-Covered Charges',
        sortField: 'nonCoveredCharges',
        hasCheckAll: false,
        columnWidth: 160,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Non-Billed Charges',
        sortField: 'nonBilledCharges',
        hasCheckAll: false,
        columnWidth: 145,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Cost',
        sortField: 'cost',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Transaction ID',
        sortField: 'transactionId',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Service Type',
        sortField: 'serviceType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Physician ID',
        sortField: 'physicianId',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Point of Service',
        sortField: 'pointOfService',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
    ]
  },
  chargeCodes: {
    fieldList: [
      {
        fieldType: 'label-link',
        fieldName: 'Charge Code',
        sortField: 'chargeCode',
        hasCheckAll: false,
        columnWidth: 105,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'Description',
        sortField: 'description',
        hasCheckAll: false,
        columnWidth: 183,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Transaction ID',
        sortField: 'transactionId',
        hasCheckAll: false,
        columnWidth: 115,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Service Date',
        sortField: 'serviceDate',
        hasCheckAll: false,
        columnWidth: 125,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Revenue Code',
        sortField: 'revenueCode',
        hasCheckAll: false,
        columnWidth: 123,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Units',
        sortField: 'units',
        hasCheckAll: false,
        columnWidth: 60,
        footerContent: 'number'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Charges',
        sortField: 'charges',
        hasCheckAll: false,
        columnWidth: 93,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Denied Charges',
        sortField: 'deniedCharges',
        hasCheckAll: false,
        columnWidth: 134,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Non-Covered Charges',
        sortField: 'nonCoveredCharges',
        hasCheckAll: false,
        columnWidth: 153,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Cost',
        sortField: 'cost',
        hasCheckAll: false,
        columnWidth: 80,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Non-Billed Charges',
        sortField: 'nonBilledCharges',
        hasCheckAll: false,
        columnWidth: 132,
        footerContent: 'currency'
      },
      {
        fieldType: 'label',
        fieldName: 'CPT Code',
        sortField: 'cptCode',
        hasCheckAll: false,
        columnWidth: 150,
        footerContent: ''
      }
    ]
  },
  claimsHistory: {
    claims: {
      fieldList: [
        {
          fieldType: 'label-expand-arrow',
          fieldName: 'Patient Cntrl #',
          sortField: 'patientControlNumber',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: 'TOTAL'
        },
        {
          fieldType: 'label',
          fieldName: 'Primary Payer',
          sortField: 'primaryPayer',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Destination Payer',
          sortField: 'destinationPayer',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Destination Payer Responsibility',
          sortField: 'destinationPayerResponsibility',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Type of Bill',
          sortField: 'billType',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim Freq. Type',
          sortField: 'claimFrequencyType',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Billing Date',
          sortField: 'billingDate',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'input-box',
          fieldName: 'Claim Number',
          sortField: 'claimNumber',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Statement From Date',
          sortField: 'statementFromDate',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Statement To Date',
          sortField: 'statementToDate',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Total Charges',
          sortField: 'totalCharges',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Total Non-Covered',
          sortField: 'totalNonCoveredCharges',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Patient Est. Amt Due',
          sortField: 'patientEstAmtDue',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Line Count',
          sortField: 'lineCount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        }
      ],
      expandData: {
        fieldList: [
          {
            fieldType: 'label',
            fieldName: 'Line #',
            sortField: 'lineNumber'
          },
          {
            fieldType: 'label',
            fieldName: 'Service Date',
            sortField: 'date'
          },
          {
            fieldType: 'label',
            fieldName: 'Rev',
            sortField: 'revenueCode'
          },
          {
            fieldType: 'label',
            fieldName: 'HCPCS',
            sortField: 'hcpcsCptCode'
          },
          {
            fieldType: 'label',
            fieldName: 'Mod',
            sortField: 'modifier'
          },
          {
            fieldType: 'label',
            fieldName: 'Qty',
            sortField: 'quantity'
          },
          {
            fieldType: 'label',
            fieldName: 'Charges',
            sortField: 'charges'
          },
          {
            fieldType: 'label',
            fieldName: 'Non-Covered Charges',
            sortField: 'nonCoveredCharges'
          }
        ]
      }
    },
    remits: {
      fieldList: [
        {
          fieldType: 'label-expand-arrow',
          fieldName: 'Patient Cntrl #',
          sortField: '_',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: 'TOTAL'
        },
        {
          fieldType: 'label',
          fieldName: 'Provider',
          sortField: 'provider',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Payer',
          sortField: 'payer',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Type of Bill',
          sortField: 'billType',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim Freq Type',
          sortField: 'claimFrequencyType',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Effective Date',
          sortField: 'effectiveDate',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Check Number',
          sortField: 'checkNumber',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Statement From Date',
          sortField: 'statementFromDate',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Statement To Date',
          sortField: 'statementToDate',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim Status',
          sortField: 'claimStatus',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label-right',
          fieldName: 'Claim Billed Amount',
          sortField: 'claimBilledAmount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: 'currency'
        },
        {
          fieldType: 'label',
          fieldName: 'Claim Paid Amount',
          sortField: 'claimPaidAmount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim-Level Adjust Amount',
          sortField: 'claimLevelAdjustAmount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim-Level Denial Amount',
          sortField: 'claimLevelDenialAmount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Line-Level Adjust Amount',
          sortField: 'lineLevelAdjustAmount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Line Count',
          sortField: 'lineCount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Line-Level Denial Amount',
          sortField: 'lineLevelDenialAmount',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim Level Adj Reason Codes',
          sortField: 'claimLevelAdjustReasonCodes',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'label',
          fieldName: 'Claim Level Remark Codes',
          sortField: 'claimLevelRemarkCodes',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        },
        {
          fieldType: 'input-box',
          fieldName: 'Claim Number',
          sortField: 'claimNumber',
          hasCheckAll: false,
          columnWidth: 133,
          footerContent: ''
        }
      ],
      expandData: {
        fieldList: [
          {
            fieldType: 'label-center',
            fieldName: 'Claim Adjustment Reason Code Details',
            sortField: 'adjustmentReasonCodes'
          },
          {
            fieldType: 'label',
            fieldName: 'Remark Code Details',
            sortField: 'remarkCodes'
          }
        ]
      }
    }
  },
  eor: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'eob',
        sortField: 'eob',
        hasCheckAll: false,
        columnWidth: 100,
        footerContent: ''
      }
    ]
  },
  detailReimb: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'Code Type',
        sortField: 'codeType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'Service Type',
        sortField: 'serviceType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Item',
        sortField: 'item',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Service Pay/Group',
        sortField: 'servicePayOrGroup',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Service Date',
        sortField: 'serviceDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent:'' 
      },
      {
        fieldType: 'label-right',
        fieldName: 'Adjusted Charges',
        sortField: 'adjustedCharges',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label',
        fieldName: 'Units',
        sortField: 'units',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Reimb Method',
        sortField: 'reimbMethod',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'PPC',
        sortField: 'ppc',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Rate',
        sortField: 'rate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Std Expected Reimbursement',
        sortField: 'expectedReimburse',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Terms Differential',
        sortField: 'termsDiff',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Column 1',
        sortField: '',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Column 2',
        sortField: '',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Column 3',
        sortField: '',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent:'' 
      }
    ]
  },
  auditStatusHistory: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'Responsibility Type',
        sortField: 'id',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-audit-status',
        fieldName: 'Audit Status',
        sortField: 'auditStatus',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Data Set',
        sortField: 'dateSet',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Changed By',
        sortField: 'changedBy',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Current Auditor',
        sortField: 'currentAuditor',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Event Date',
        sortField: 'eventDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Days Elapsed',
        sortField: 'daysElapsed',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Variance Category',
        sortField: 'varianceCategory',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Current Reviewer',
        sortField: 'currentReviewer',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      } 
    ]
  },
  icdCodes: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'ICD Code',
        sortField: 'icdCode',
        hasCheckAll: false,
        columnWidth: 153,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'ICD Code Version',
        sortField: 'icdVersion',
        hasCheckAll: false,
        columnWidth: 153,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Description',
        sortField: 'description',
        hasCheckAll: false,
        columnWidth: 270,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Type',
        sortField: 'type',
        hasCheckAll: false,
        columnWidth: 300,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Rank',
        sortField: 'rank',
        hasCheckAll: false,
        columnWidth: 153,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'POA',
        sortField: 'poa',
        hasCheckAll: false,
        columnWidth: 153,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Transaction ID',
        sortField: 'transactionId',
        hasCheckAll: false,
        columnWidth: 343,
        footerContent: ''
      } 
    ]
  },
  payments: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'Paid By',
        sortField: 'paidBy',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'PayerID',
        sortField: 'payerId',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Payer Name',
        sortField: 'payerName',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Contract Name',
        sortField: 'contractName',
        hasCheckAll: false,
        columnWidth: 229,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Payment Date',
        sortField: 'paymentDate',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: ''
      },
      {
        fieldType: 'label-info-right-payment-details-popup',
        fieldName: 'Est Pay/Allowable',
        sortField: 'estPayAllowable',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-info-right-other-payer-popup',
        fieldName: 'Actual Payment',
        sortField: 'actualPayment',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Write-Off',
        sortField: 'writeoff',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Balance Due',
        sortField: 'balanceDue',
        hasCheckAll: false,
        columnWidth: 143,
        footerContent: 'currency'
      }
    ]
  },
  professionalClaims: {
    fieldList: [
      {
        fieldType: 'label-expand-arrow',
        fieldName: 'Patient Cntrl #',
        sortField: 'patientControlNumber',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'Primary Payer',
        sortField: 'primaryPayer',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Destination Payer',
        sortField: 'destinationPayer',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Destination Payer Responsibility',
        sortField: 'destinationPayerResponsibility',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Claim Freq. Type',
        sortField: 'claimFrequencyType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Billing Date',
        sortField: 'billingDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'input-box',
        fieldName: 'Claim Number',
        sortField: 'claimNumber',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Statement From Date',
        sortField: 'statementFromDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Statement To Date',
        sortField: 'statementToDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Total Charges',
        sortField: 'totalCharges',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label',
        fieldName: 'Line Count',
        sortField: 'lineCount',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
    ],
    expandData: {
      fieldList: [
        {
          fieldType: 'label',
          fieldName: 'Line #',
          sortField: 'lineNumber'
        },
        {
          fieldType: 'label',
          fieldName: 'Service Date',
          sortField: 'date'
        },
        {
          fieldType: 'label',
          fieldName: 'HCPCS',
          sortField: 'hcpcsCptCode'
        },
        {
          fieldType: 'label',
          fieldName: 'Mod',
          sortField: 'modifier'
        },
        {
          fieldType: 'label',
          fieldName: 'Qty',
          sortField: 'quantity'
        },
        {
          fieldType: 'label',
          fieldName: 'Charges',
          sortField: 'charges'
        }
      ]
    }
  },
  contactInfo: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'ActualPatientId',
        sortField: 'actualPatientId',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Facility Name',
        sortField: 'facilityName',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'TaxId',
        sortField: 'taxId',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Npi',
        sortField: 'npi',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Payee Name',
        sortField: 'payeeName',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Payer Phone',
        sortField: 'payerPhone',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Subscriber ID',
        sortField: 'subscriberID',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Insured Ssn',
        sortField: 'InsuredSsn',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Insured Group Name',
        sortField: 'insuredGroupName',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Patient Name',
        sortField: 'patientName',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Date Of Birth',
        sortField: 'dateOfBirth',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Account Number',
        sortField: 'accountNumber',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Total Charges',
        sortField: 'totalCharges',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Insured Name',
        sortField: 'insuredName',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Admit Date',
        sortField: 'admitDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Discharge Date',
        sortField: 'dischargeDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Patient Type',
        sortField: 'patientType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Medical Record No',
        sortField: 'medicalRecordNo',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Social SecurityNo',
        sortField: 'socialSecurityNo',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Audit Status',
        sortField: 'auditStatus',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Review Category',
        sortField: 'reviewCategory',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Variance Category',
        sortField: 'varianceCategory',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Closed Result',
        sortField: 'closedResult',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Committed Amount',
        sortField: 'committedAmount',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Assigned Reviewer',
        sortField: 'assignedReviewer',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Argument',
        sortField: 'argument',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Auditor',
        sortField: 'auditor',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Review Reason',
        sortField: 'reviewReason',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Var Cat Suggestion',
        sortField: 'varCatSuggestion',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Closed Reason',
        sortField: 'closedReason',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Pursuing Reason',
        sortField: 'pursuingReason',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Follow-Up-Date',
        sortField: 'followUpDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Event Date',
        sortField: 'eventDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Start Date',
        sortField: 'startDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Agency',
        sortField: 'agency',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Review Stage',
        sortField: 'reviewStage',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Responsibility',
        sortField: 'responsibility',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Type',
        sortField: 'type',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Duration',
        sortField: 'duration',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
      ,
      {
        fieldType: 'label',
        fieldName: 'Note',
        sortField: 'note',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      }
    ]
  },
  
  

};

export const WorklistResearchPaymentDetailsHeaderConfig: ResearchDataModalPaymentDetailHeaderModel = {
  
  paymentDetails: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'Paid By',
        sortField: 'paidBy',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'Payment Type',
        sortField: 'paymentType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Import Date',
        sortField: 'importDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Posting Date',
        sortField: 'postingDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Payment Date',
        sortField: 'paymentDate',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-center',
        fieldName: 'Amount',
        sortField: 'amount',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label-right',
        fieldName: 'Excluded Amount',
        sortField: 'excludedAmount',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },
      {
        fieldType: 'label',
        fieldName: 'Adjustment Code',
        sortField: 'adjustCode',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-right',
        fieldName: 'Adjustment Code Des',
        sortField: 'adjustCodeDescription',
        hasCheckAll: false,
        columnWidth: 200,
        footerContent: ''
      }
    ]
  }
   
};

export const WorklistResearchPaymentOtherHeaderConfig: ResearchDataModalPaymentOtherHeaderModel = {
  paymentDetailsOther: {
    fieldList: [
      {
        fieldType: 'label',
        fieldName: 'Paid By',
        sortField: 'paidBy',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'TOTAL'
      },
      {
        fieldType: 'label',
        fieldName: 'Account Number',
        sortField: 'accountNumber',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-editable-input',
        fieldName: 'Adjust Code',
        sortField: 'adjustCode',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Adjust Code Description',
        sortField: 'adjustCodeDescription',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Adjustment Type',
        sortField: 'adjustmentType',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Posting Code',
        sortField: 'postingCode',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label-editable-payer-dropdown',
        fieldName: 'Payer ID',
        sortField: 'payerId',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },
      {
        fieldType: 'label',
        fieldName: 'Plan ID',
        sortField: 'planId',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: ''
      },

      {
        fieldType: 'label-center',
        fieldName: 'Amount',
        sortField: 'amount',
        hasCheckAll: false,
        columnWidth: 133,
        footerContent: 'currency'
      },

      {
        fieldType: 'label',
        fieldName: 'Import Date',
        sortField: 'importDate',
        hasCheckAll: false,
        columnWidth: 200,
        footerContent: ''
      }
    ]
  }
};
