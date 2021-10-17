import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { isNumber, padNumber } from './util';

@Injectable()
export class NgbDateConversion {
  /**
   * convert ng-bootstrap date structure to date string
   * @param date ng-bootstrap date structure
   * @returns date string
   */
  formatToStr(date: NgbDateStruct): string {
    return date
      ? `${isNumber(date.month) ? padNumber(date.month) : ''}/${isNumber(date.day) ? padNumber(date.day) : ''}/${
          date.year
        }`
      : '';
  }

  /**
   * convert date strig to ng-bootstrap date structure
   * @param dateStr date in string format
   * @returns ng-bootstrap date structure
   */
  formatToDate(dateStr: string): NgbDateStruct {
    if (dateStr === '') {
      return {
        day: 0,
        month: 0,
        year: 0
      };
    } else {
      const date = moment(dateStr);
      return {
        year: date.year(),
        month: date.month() + 1,
        day: date.date()
      };
    }
  }
}
