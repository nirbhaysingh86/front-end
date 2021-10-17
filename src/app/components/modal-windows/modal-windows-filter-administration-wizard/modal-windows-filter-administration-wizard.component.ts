import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { find } from 'lodash';
import * as moment from 'moment';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import {
  CostDropdownOptions,
  DateDropdownOptions,
  DateTimeDropdownOptions,
  TimeHourDropdownOptions,
  PercentDropdownOptions,
  TextNameLeftDropdownOptions,
  TextNameRightDropdownOptions,
  TextStateLeftDropdownOptions,
  TextStateRightDropdownOptions,
  DateFormat
} from '../../../../config/configuration';
import { FilterAdministrationWizardModel, RuleTypeOptionModel } from '../../../model/filterAdministrationWizard.model';
import { RuleRequestModel } from '../../../model/requests/createRulesRequest.model';
import { FieldType } from '../../../model/responses/getFieldsResponse.model';
import { FieldValueResponseModel } from '../../../model/responses/getFieldValuesResponse.model';
import { RuleResponse } from '../../../model/responses/getRulesResponse.model';

interface DateStructrue {
  year: number;
  month: number;
  day: number;
}

const now = moment();

/**
 * This class represents the lazy loaded ModalWindowsFilterAdministrationWizardComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-filter-administration-wizard',
  templateUrl: 'modal-windows-filter-administration-wizard.component.html',
  styleUrls: ['modal-windows-filter-administration-wizard.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class ModalWindowsFilterAdministrationWizardComponent implements OnInit {
  @Input() modalData = {
    name: ''
  };
  @Input() dataListFilterAdministrationWizard: any[] = [];
  @Input() valuesOptions: FieldValueResponseModel[] = [];
  @Input() initialValue?: RuleResponse;
  @Input() initialRuleCategory?: FilterAdministrationWizardModel;
  @Input() initialRuleType?: RuleTypeOptionModel;

  @Output() loadValues: EventEmitter<number> = new EventEmitter();
  @Output() closeModalWindow: EventEmitter<void> = new EventEmitter();
  @Output() clickSave: EventEmitter<RuleRequestModel[]> = new EventEmitter();

  ruleCategory?: FilterAdministrationWizardModel; // 'Select a Category'
  ruleType?: RuleTypeOptionModel; // ''
  ruleSubCategory: FieldType = ''; // ''

  ruleArray: RuleRequestModel[] = [];

  costDropdownOptions = CostDropdownOptions;
  dateDropdownOptions = DateDropdownOptions;
  dateTimeDropdownOptions = DateTimeDropdownOptions;
  timeHourDropdownOptions = TimeHourDropdownOptions;
  percentDropdownOptions = PercentDropdownOptions;
  textNameLeftDropdownOptions = TextNameLeftDropdownOptions;
  textNameRightDropdownOptions = TextNameRightDropdownOptions;
  textStateLeftDropdownOptions = TextStateLeftDropdownOptions;
  textStateRightDropdownOptions = TextStateRightDropdownOptions;

  valuesSearchText = '';
  valuesSelectAllChecked = false;
  errorMsg = '';
  inputChange$: Subject<void> = new Subject();
  defaultValues = {
    formCost: {
      firstInput: '0.00',
      secondInput: '0.00',
      singleInput: '0.00'
    },
    formDate: {
      from: {
        year: now.year(),
        month: now.month() + 1,
        day: now.date()
      },
      to: {
        year: now.year(),
        month: now.month() + 1,
        day: now.date()
      }
    },
    formDateTime: {
      fromDate: {
        year: now.year(),
        month: now.month() + 1,
        day: now.date()
      },
      fromTime: now.format('hh:00 a'),
      toDate: {
        year: now.year(),
        month: now.month() + 1,
        day: now.date()
      },
      toTime: now.format('hh:00 a')
    },
    formPercent: {
      firstInput: '10.00',
      secondInput: '30.00',
      singleInput: '0.00'
    },
    formTextName: {
      firstInput: '',
      secondInput: '',
      singleInput: ''
    },
    formValues: {
      selected: [] as FieldValueResponseModel[]
    }
  };

  formCost = {
    compare: this.costDropdownOptions[0],
    firstInput: this.defaultValues.formCost.firstInput,
    firstInputError: false,
    secondInput: this.defaultValues.formCost.secondInput,
    secondInputError: false,
    singleInput: this.defaultValues.formCost.singleInput,
    singleInputError: false,
    checkAll: false
  };

  formDate = {
    type: this.dateDropdownOptions[0],
    from: this.defaultValues.formDate.from,
    to: this.defaultValues.formDate.to,
    checkAll: false,
    error: false
  };

  formDateTime = {
    type: this.dateTimeDropdownOptions[0],
    fromDate: this.defaultValues.formDateTime.fromDate,
    fromTime: this.defaultValues.formDateTime.fromTime,
    toDate: this.defaultValues.formDateTime.toDate,
    toTime: this.defaultValues.formDateTime.toTime,
    checkAll: false,
    error: false
  };

  formPercent = {
    compare: this.percentDropdownOptions[0],
    firstInput: this.defaultValues.formPercent.firstInput,
    firstInputError: false,
    secondInput: this.defaultValues.formPercent.secondInput,
    secondInputError: false,
    singleInput: this.defaultValues.formPercent.singleInput,
    singleInputError: false,
    checkAll: false
  };

  formTextName = {
    compareLeft: this.textNameLeftDropdownOptions[0],
    compareRight: this.textNameRightDropdownOptions[0],
    firstInput: this.defaultValues.formTextName.firstInput,
    firstInputError: false,
    secondInput: this.defaultValues.formTextName.secondInput,
    secondInputError: false,
    singleInput: this.defaultValues.formTextName.singleInput,
    singleInputError: false,
    checkAll: false
  };

  formValues = {
    compareLeft: this.textStateLeftDropdownOptions[0],
    compareRight: this.textStateRightDropdownOptions[0],
    selected: [...this.defaultValues.formValues.selected],
    checkAll: false
  };

  ngOnInit(): void {
    this.ruleCategory = this.initialRuleCategory;
    this.ruleType = this.initialRuleType;
    if (this.ruleType) {
      this.getSubCategory();
    }
    this.setInitialValue();

    this.inputChange$.pipe(debounceTime(200)).subscribe(() => {
      this.validate();
    });
  }

  // set initial value if edit existing rules
  setInitialValue(): void {
    const parseDate = (val: string) => {
      const date = moment(val, DateFormat);
      return {
        year: date.year(),
        month: date.month() + 1,
        day: date.date()
      };
    };

    const parseTime = (val: string) => {
      return moment(val, 'HH:mm').format('hh:mm a');
    };

    const parseTextOperand = (val: string) => {
      let left = '';
      let right = '';
      const parts = val.split(' + ');
      switch (parts[0]) {
        case 'BEGIN':
          left = 'Begins with';
          break;
        case 'END':
          left = 'Ends with';
          break;
        case 'CONTAINS':
          left = 'Contains';
          break;
        default:
          break;
      }
      switch (parts[1]) {
        case 'SINGLE':
          right = 'Single value';
          break;
        case 'BETWEEN':
          right = 'Between';
          break;
        default:
          break;
      }
      return [left, right];
    };
    if (this.initialValue && this.initialRuleType) {
      switch (this.initialRuleType.ruleSubCategory) {
        case 'DateRange':
          this.formDate.from = parseDate(this.initialValue.beginRange) as any;
          this.formDate.to = parseDate(this.initialValue.endRange) as any;
          break;
        case 'DateTimeRange':
          const begin = this.initialValue.beginRange.split(' ');
          if (begin.length === 2) {
            this.formDateTime.fromDate = parseDate(begin[0]) as any;
            this.formDateTime.fromTime = parseTime(begin[1]);
          }
          const end = this.initialValue.endRange.split(' ');
          if (end.length === 2) {
            this.formDateTime.toDate = parseDate(end[0]) as any;
            this.formDateTime.toTime = parseTime(end[1]);
          }
          break;
        case 'Number':
          switch (this.initialValue.operand) {
            case '>':
              this.formCost.compare = 'Greater Than';
              break;
            case '<':
              this.formCost.compare = 'Less Than';
              break;
            case '=':
              this.formCost.compare = 'Equal To';
              break;
            case 'BETWEEN':
              this.formCost.compare = 'Between';
              break;
            default:
              break;
          }
          if (this.initialValue.operand === 'BETWEEN') {
            this.formCost.firstInput = this.initialValue.beginRange;
            this.formCost.secondInput = this.initialValue.endRange;
          } else {
            this.formCost.singleInput = this.initialValue.value;
          }
          break;
        case 'Percent':
          switch (this.initialValue.operand) {
            case '>':
              this.formPercent.compare = 'Greater Than';
              break;
            case '<':
              this.formPercent.compare = 'Less Than';
              break;
            case '=':
              this.formPercent.compare = 'Equal To';
              break;
            case 'BETWEEN':
              this.formPercent.compare = 'Between';
              break;
            default:
              break;
          }
          if (this.initialValue.operand === 'BETWEEN') {
            this.formPercent.firstInput = (parseFloat(this.initialValue.beginRange) * 100).toString();
            this.formPercent.secondInput = (parseFloat(this.initialValue.endRange) * 100).toString();
          } else {
            this.formPercent.singleInput = (parseFloat(this.initialValue.value) * 100).toString();
          }
          break;
        case 'Text':
          const ops = parseTextOperand(this.initialValue.operand);
          this.formTextName.compareLeft = ops[0];
          this.formTextName.compareRight = ops[1];
          if (this.formTextName.compareRight === 'Between') {
            this.formTextName.firstInput = this.initialValue.beginRange;
            this.formTextName.secondInput = this.initialValue.endRange;
          } else {
            this.formTextName.singleInput = this.initialValue.value;
          }
          break;
        case 'Values':
          this.formValues.compareRight =
            this.initialValue.operand === 'IN' ? 'Include Selected Value' : 'Exclude Selected Value';
          const found = find(this.valuesOptions, (o) => o.id.toString() === this.initialValue!.valueId);
          if (found) {
            this.formValues.selected = [found];
          }
          break;
        default:
          break;
      }
    }
  }

  // set default value
  setDefaultValue(): void {
    switch (this.ruleSubCategory) {
      case 'DateRange':
        this.formDate.from = this.defaultValues.formDate.from;
        this.formDate.to = this.defaultValues.formDate.to;
        break;
      case 'DateTimeRange':
        this.formDateTime.fromDate = this.defaultValues.formDateTime.fromDate;
        this.formDateTime.fromTime = this.defaultValues.formDateTime.fromTime;
        this.formDateTime.toDate = this.defaultValues.formDateTime.toDate;
        this.formDateTime.toTime = this.defaultValues.formDateTime.toTime;
        break;
      case 'Number':
        this.formCost.firstInput = this.defaultValues.formCost.firstInput;
        this.formCost.secondInput = this.defaultValues.formCost.secondInput;
        this.formCost.singleInput = this.defaultValues.formCost.singleInput;
        break;
      case 'Percent':
        this.formPercent.firstInput = this.defaultValues.formPercent.firstInput;
        this.formPercent.secondInput = this.defaultValues.formPercent.secondInput;
        this.formPercent.singleInput = this.defaultValues.formPercent.singleInput;
        break;
      case 'Text':
        this.formTextName.firstInput = this.defaultValues.formTextName.firstInput;
        this.formTextName.secondInput = this.defaultValues.formTextName.secondInput;
        this.formTextName.singleInput = this.defaultValues.formTextName.singleInput;
        break;
      case 'Values':
        this.formValues.selected = [...this.defaultValues.formValues.selected];
        break;
      default:
        break;
    }
  }

  resetError(): void {
    switch (this.ruleSubCategory) {
      case 'DateRange':
        this.formDate.error = false;
        break;
      case 'DateTimeRange':
        this.formDateTime.error = false;
        break;
      case 'Number':
        this.formCost.singleInputError = false;
        this.formCost.firstInputError = false;
        this.formCost.secondInputError = false;
        break;
      case 'Percent':
        this.formPercent.firstInputError = false;
        this.formPercent.secondInputError = false;
        this.formPercent.singleInputError = false;
        break;
      case 'Text':
        this.formTextName.firstInputError = false;
        this.formTextName.secondInputError = false;
        this.formTextName.singleInputError = false;
        break;
      default:
        break;
    }
    this.errorMsg = '';
  }

  // reset state
  resetState(): void {
    this.resetError();
    this.setDefaultValue();
    if (this.initialValue) {
      this.setInitialValue();
    }
  }

  // change compare dropdown
  changeCompare(compare: string, pos?: 'left' | 'right'): void {
    this.resetState();
    switch (this.ruleSubCategory) {
      case 'Number':
        this.formCost.compare = compare;
        break;
      case 'Percent':
        this.formPercent.compare = compare;
        break;
      case 'Text':
        if (pos === 'left') {
          this.formTextName.compareLeft = compare;
        } else {
          this.formTextName.compareRight = compare;
        }
        break;
      default:
        break;
    }
  }

  updateRuleCategory(category: FilterAdministrationWizardModel): void {
    this.resetState();
    this.ruleCategory = category;
    this.ruleType = undefined;
    this.ruleSubCategory = '';
  }

  updateRuleType(type: RuleTypeOptionModel): void {
    this.resetState();
    this.ruleType = type;
    this.getSubCategory();
    this.getValues();
  }

  // get Sub Category
  getSubCategory(): void {
    this.ruleSubCategory = this.ruleType!.ruleSubCategory;
  }

  // get values
  getValues(): void {
    if (this.ruleSubCategory === 'Values') {
      this.loadValues.emit(this.ruleType!.id);
    }
  }

  // click Minu of Cost
  clickMinuCost(): void {
    this.formCost.singleInput = (parseFloat(this.formCost.singleInput) - 1).toString();
  }

  // click Add of Cost
  clickAddCost(): void {
    this.formCost.singleInput = (parseFloat(this.formCost.singleInput) + 1).toString();
  }

  // click Minu of Percent
  clickMinuPercent(): void {
    const value = parseFloat(this.formPercent.singleInput);
    if (value >= 1) {
      this.formPercent.singleInput = (value - 1).toString();
    }
  }

  // click Add of Percent
  clickAddPercent(): void {
    const value = parseFloat(this.formPercent.singleInput);
    if (value <= 99) {
      this.formPercent.singleInput = (value + 1).toString();
    }
  }

  // changes on form input
  onInputChanges(): void {
    this.inputChange$.next();
  }

  // validate form input
  validate(): void {
    switch (this.ruleSubCategory) {
      case 'DateRange':
        if (!this.formDate.from) {
          this.errorMsg = 'From date required';
          this.formDate.error = true;
        } else if (!this.formDate.to) {
          this.errorMsg = 'To date required';
          this.formDate.error = true;
        } else if (!this.showTimeError(this.formDate.from, this.formDate.to)) {
          this.errorMsg = 'First date should be earlier than second date';
          this.formDate.error = true;
        } else {
          this.errorMsg = '';
          this.formDate.error = false;
        }
        break;
      case 'DateTimeRange':
        if (!this.formDateTime.fromDate) {
          this.errorMsg = 'From date required';
          this.formDateTime.error = true;
        } else if (!this.formDateTime.fromTime) {
          this.errorMsg = 'From time required';
          this.formDateTime.error = true;
        } else if (!this.formDateTime.toDate) {
          this.errorMsg = 'To date required';
          this.formDateTime.error = true;
        } else if (!this.formDateTime.toTime) {
          this.errorMsg = 'To time required';
          this.formDateTime.error = true;
        } else if (
          this.formDateTime.fromDate.year === this.formDateTime.toDate.year &&
          this.formDateTime.fromDate.month === this.formDateTime.toDate.month &&
          this.formDateTime.fromDate.day === this.formDateTime.toDate.day
        ) {
          if (this.getTimeIndex(this.formDateTime.fromTime) > this.getTimeIndex(this.formDateTime.toTime)) {
            this.errorMsg = 'First datetime should be earlier than second datetime';
            this.formDateTime.error = true;
          } else {
            this.errorMsg = '';
            this.formDateTime.error = false;
          }
        } else if (!this.showTimeError(this.formDateTime.fromDate, this.formDateTime.toDate)) {
          this.errorMsg = 'First datetime should be earlier than second datetime';
          this.formDateTime.error = true;
        } else {
          this.errorMsg = '';
          this.formDateTime.error = false;
        }
        break;
      case 'Number':
        if (this.formCost.compare === 'Between') {
          if (!this.formCost.firstInput) {
            this.errorMsg = 'First value required';
            this.formCost.firstInputError = true;
          } else if (!this.formCost.secondInput) {
            this.errorMsg = 'Second value required';
            this.formCost.secondInputError = true;
          } else if (parseFloat(this.formCost.firstInput) > parseFloat(this.formCost.secondInput)) {
            this.errorMsg = 'First value should be less than second value';
            this.formCost.firstInputError = true;
          } else {
            this.errorMsg = '';
            this.formCost.firstInputError = false;
            this.formCost.secondInputError = false;
          }
        } else {
          if (!this.formCost.singleInput) {
            this.errorMsg = 'Value required';
            this.formCost.singleInputError = true;
          } else {
            this.errorMsg = '';
            this.formCost.singleInputError = false;
          }
        }
        break;
      case 'Percent':
        if (this.formPercent.compare === 'Between') {
          if (!this.formPercent.firstInput) {
            this.errorMsg = 'First value required';
            this.formPercent.firstInputError = true;
          } else if (!this.formPercent.secondInput) {
            this.errorMsg = 'Second value required';
            this.formPercent.secondInputError = true;
          } else if (parseFloat(this.formPercent.firstInput) > parseFloat(this.formPercent.secondInput)) {
            this.errorMsg = 'First value should be less than second value';
            this.formPercent.firstInputError = true;
          } else {
            this.errorMsg = '';
            this.formPercent.firstInputError = false;
            this.formPercent.secondInputError = false;
          }
        } else {
          if (!this.formPercent.singleInput) {
            this.errorMsg = 'Value required';
            this.formPercent.singleInputError = true;
          } else {
            this.errorMsg = '';
            this.formPercent.singleInputError = false;
          }
        }
        break;
      case 'Text':
        if (this.formTextName.compareRight === 'Between') {
          if (!this.formTextName.firstInput) {
            this.formTextName.firstInputError = true;
          } else if (!this.formTextName.secondInput) {
            this.formTextName.secondInputError = true;
          } else if (this.formTextName.firstInput > this.formTextName.secondInput) {
            this.errorMsg = 'First value should be less than second value';
            this.formTextName.firstInputError = true;
          } else {
            this.errorMsg = '';
            this.formTextName.firstInputError = false;
            this.formTextName.secondInputError = false;
          }
        } else {
          if (!this.formTextName.singleInput) {
            this.formTextName.singleInputError = true;
          } else {
            this.formTextName.singleInputError = false;
          }
        }
        break;
      default:
        break;
    }
  }

  // enable Add Rule
  enableAddRule(): boolean {
    let enabled = false;

    if (this.ruleSubCategory === 'Number') {
      if (this.formCost.compare === 'Between') {
        enabled = !this.formCost.firstInputError && !this.formCost.secondInputError;
      } else {
        enabled = !this.formCost.singleInputError;
      }
    }

    if (this.ruleSubCategory === 'DateRange') {
      enabled = !this.formDate.error;
    }

    if (this.ruleSubCategory === 'DateTimeRange') {
      enabled = !this.formDateTime.error;
    }

    if (this.ruleSubCategory === 'Percent') {
      if (this.formPercent.compare === 'Between') {
        enabled = !this.formPercent.firstInputError && !this.formPercent.secondInputError;
      } else {
        enabled = !this.formPercent.singleInputError;
      }
    }

    if (this.ruleSubCategory === 'Text') {
      if (this.formTextName.compareRight === 'Between') {
        enabled = !this.formTextName.firstInputError && !this.formTextName.secondInputError;
      } else {
        enabled = !this.formTextName.singleInputError;
      }
    }

    if (this.ruleSubCategory === 'Values') {
      enabled = this.formValues.selected.length > 0;
    }

    return enabled;
  }

  // show Time Error
  showTimeError(firstTime: any, secondTime: any): boolean {
    const firstDate = new Date(
      `${firstTime.year.toString()}/${firstTime.month.toString()}/${firstTime.day.toString()}`
    );
    const secondDate = new Date(
      `${secondTime.year.toString()}/${secondTime.month.toString()}/${secondTime.day.toString()}`
    );

    return firstDate.getTime() <= secondDate.getTime();
  }

  // get Time Index
  getTimeIndex(timeString: string): number {
    let timeIndex = 0;
    this.timeHourDropdownOptions.forEach((item, index) => {
      if (item === timeString) {
        timeIndex = index;
      }
    });

    return timeIndex;
  }

  buildRule(): RuleRequestModel[] {
    const rules = [];
    const formatDate = (value: DateStructrue) => {
      return moment()
        .date(value.day)
        .month(value.month - 1)
        .year(value.year)
        .format(DateFormat);
    };
    const formatTime = (value: string) => {
      return moment(value, 'hh:mm a').format('HH:mm');
    };

    const formatTextOperand = (left: string, right: string) => {
      let part1 = '';
      switch (left) {
        case 'Begins with':
          part1 = 'BEGIN';
          break;
        case 'Ends with':
          part1 = 'END';
          break;
        case 'Contains':
          part1 = 'CONTAINS';
          break;
        default:
          break;
      }
      let part2 = '';
      switch (right) {
        case 'Single value':
          part2 = 'SINGLE';
          break;
        case 'Between':
          part2 = 'BETWEEN';
          break;
        default:
          break;
      }
      return part1 + ' + ' + part2;
    };

    const rule: RuleRequestModel = {
      fieldId: this.ruleType!.id
    };
    switch (this.ruleSubCategory) {
      case 'Number':
        switch (this.formCost.compare) {
          case 'Equal To':
            rule.operand = '=';
            break;
          case 'Greater Than':
            rule.operand = '>';
            break;
          case 'Less Than':
            rule.operand = '<';
            break;
          case 'Between':
            rule.operand = 'BETWEEN';
            break;
          default:
            break;
        }
        if (this.formCost.compare === 'Between') {
          rule.beginRange = parseFloat(this.formCost.firstInput);
          rule.endRange = parseFloat(this.formCost.secondInput);
        } else {
          rule.value = parseFloat(this.formCost.singleInput);
        }
        rules.push(rule);
        break;
      case 'Percent':
        switch (this.formPercent.compare) {
          case 'Equal To':
            rule.operand = '=';
            break;
          case 'Greater Than':
            rule.operand = '>';
            break;
          case 'Less Than':
            rule.operand = '<';
            break;
          case 'Between':
            rule.operand = 'BETWEEN';
            break;
          default:
            break;
        }
        if (this.formPercent.compare === 'Between') {
          rule.beginRange = parseFloat(this.formPercent.firstInput) / 100;
          rule.endRange = parseFloat(this.formPercent.secondInput) / 100;
        } else {
          rule.value = parseFloat(this.formPercent.singleInput) / 100;
        }
        rules.push(rule);
        break;
      case 'DateRange':
        rule.operand = 'BETWEEN';
        rule.beginRange = formatDate(this.formDate.from as any);
        rule.endRange = formatDate(this.formDate.to as any);
        rules.push(rule);
        break;
      case 'DateTimeRange':
        rule.operand = 'BETWEEN';
        rule.beginRange = formatDate(this.formDateTime.fromDate as any) + ' ' + formatTime(this.formDateTime.fromTime);
        rule.endRange = formatDate(this.formDateTime.toDate as any) + ' ' + formatTime(this.formDateTime.toTime);
        rules.push(rule);
        break;
      case 'Text':
        rule.operand = formatTextOperand(this.formTextName.compareLeft, this.formTextName.compareRight);
        if (this.formTextName.compareRight === 'Between') {
          rule.beginRange = this.formTextName.firstInput;
          rule.endRange = this.formTextName.secondInput;
        } else {
          rule.value = this.formTextName.singleInput;
        }
        rules.push(rule);
        break;
      case 'Values':
        const operand = this.formValues.compareRight === 'Include Selected Value' ? 'IN' : 'NOT IN';
        this.formValues.selected.forEach((item) => {
          rules.push({
            fieldId: rule.fieldId,
            operand,
            value: item.displayValue,
            valueId: item.id
          });
        });
        break;
      default:
        break;
    }

    return rules;
  }

  // click Add Rule
  clickAddRule(): void {
    this.ruleArray.push(...this.buildRule());
    this.ruleCategory = undefined;
    this.ruleType = undefined;
    this.ruleSubCategory = '';
  }

  // click Check All Values
  clickCheckAllValues(): void {
    if (!this.valuesSelectAllChecked) {
      // check all
      this.valuesOptions.forEach((item, index) => {
        if (this.isUnderSearch(index)) {
          this.formValues.selected.push(item);
        }
      });
    } else {
      // uncheck all
      this.formValues.selected = [];
    }
  }

  // click Check State
  clickCheckValue(i: number): void {
    const matchedIndex = this.formValues.selected.indexOf(this.valuesOptions[i]);
    if (matchedIndex > -1) {
      this.formValues.selected.splice(matchedIndex, 1);
    } else {
      this.formValues.selected.push(this.valuesOptions[i]);
    }

    if (this.formValues.selected.length === 0) {
      this.valuesSelectAllChecked = false;
    } else if (this.formValues.selected.length === this.valuesOptions.length) {
      this.valuesSelectAllChecked = true;
    }
  }

  // click Delete Value
  clickDeleteValue(i: number): void {
    this.formValues.selected.splice(i, 1);

    if (this.formValues.selected.length === 0) {
      this.valuesSelectAllChecked = false;
    } else if (this.formValues.selected.length === this.valuesOptions.length) {
      this.valuesSelectAllChecked = true;
    }
  }

  // is Under Search
  isUnderSearch(i: number): boolean {
    return this.valuesOptions[i].displayValue.toLowerCase().indexOf(this.valuesSearchText.trim().toLowerCase()) > -1;
  }

  // is Checked Value
  isCheckedValue(i: number): boolean {
    return this.formValues.selected.indexOf(this.valuesOptions[i]) > -1;
  }

  // click Clear All State
  clickClearAllValues(): void {
    this.valuesSelectAllChecked = false;
    this.formValues.selected = [];
  }

  /**
   * close Modal
   */
  closeModal(): void {
    this.closeModalWindow.emit();
  }

  /**
   * save rules
   */
  save(): void {
    const rules = this.ruleArray.concat(this.buildRule());
    this.clickSave.emit(rules);
  }
}
