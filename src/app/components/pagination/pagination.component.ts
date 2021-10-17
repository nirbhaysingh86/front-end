import { Component, Input, EventEmitter, Output } from '@angular/core';
import { range } from 'lodash';

interface PagingModel {
  pagePerNumber: string; // row number per page
  pageIndex: number; // current page index
  totalRow: number; // total number of rows
}

/**
 * This class represents the lazy loaded PaginationComponent.
 */
@Component({
  selector: 'app-sd-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss']
})
export class PaginationComponent {
  pPageData: PagingModel = {
    pagePerNumber: '',
    pageIndex: 0,
    totalRow: 0
  };
  @Input() pagePerNumberDropdownOptions: string[] = [];
  @Input() set pageData(value: PagingModel) {
    this.pPageData = value;
    const perPage = parseInt(this.pageData.pagePerNumber, 10);
    this.totalPage = Math.ceil(this.pageData.totalRow / perPage);
    if (this.totalPage < 6) {
      this.pagerLinks = range(this.totalPage);
    } else if (this.pageData.pageIndex < 3) {
      this.pagerLinks = [0, 1, 2, 3, 4];
    } else if (this.pageData.pageIndex + 3 >= this.totalPage) {
      this.pagerLinks = range(this.totalPage - 5, this.totalPage);
    } else {
      this.pagerLinks = range(this.pageData.pageIndex - 2, this.pageData.pageIndex + 3);
    }
  }
  get pageData(): PagingModel {
    return this.pPageData;
  }

  pagerLinks: number[] = []; // array of page links
  totalPage = 0;

  @Output() changePagination: EventEmitter<any> = new EventEmitter();

  /**
   * click Prev arrow
   */
  clickPrev(): void {
    this.pageData.pageIndex--;
    this.changePagination.emit(this.pageData);
  }

  /**
   * click Page Number Link
   * @param index clicked page index
   */
  clickPageLink(index: number): void {
    if (this.pageData.pageIndex !== index) {
      this.pageData.pageIndex = index;
      this.changePagination.emit(this.pageData);
    }
  }

  /**
   * click Next arrow
   */
  clickNext(): void {
    this.pageData.pageIndex++;
    this.changePagination.emit(this.pageData);
  }

  // change Dropdown
  changeDropdown(event: string): void {
    this.pageData.pagePerNumber = event;
    this.pageData.pageIndex = 0;
    this.changePagination.emit(this.pageData);
  }
}
