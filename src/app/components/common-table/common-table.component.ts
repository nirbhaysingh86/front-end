import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { isNumber, isString } from 'lodash';
import { TableModel } from '../../model/table.model';
import { TableOptionActionModel } from '../../model/tableOptionAction.model';
import { TableHeader } from '../../model/tableHeaders.model';
import { PayerIDDropdownOptions } from '../../../config/configuration';

/**
 * This class represents the lazy loaded CommonTableComponent.
 */
@Component({
  selector: 'app-sd-common-table',
  templateUrl: 'common-table.component.html',
  styleUrls: ['common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  @Input() header: any;
  @Input() dataList = [] as any[];
  @Input() sortable = false;
  @Input() sortData = {
    sortColumn: '',
    sortOrder: '' // 'asc', 'desc'
  };
  @Input() popupToShow = '';
  @Input() hasWidthSetting = false;

  @Output() changeSort: EventEmitter<any> = new EventEmitter();
  @Output() clickTableOptions: EventEmitter<TableOptionActionModel> = new EventEmitter();
  @Output() clickFirstColumnCell: EventEmitter<number> = new EventEmitter();
  @Output() clickRow: EventEmitter<TableModel> = new EventEmitter();

  checkAll = false;
  shownPopupIndex = -1;
  isShownFilter = false; // false

  isDragging = false;
  draggingColumnIndex = 0;
  initialLeft = 0;
  transform: number[] = [];

  payerIDDropdownOptions = PayerIDDropdownOptions;

  filteredArray: string[] = [];

  /**
   * OnInit
   */
  ngOnInit(): void {
    if (this.dataList.length > 0) {
      this.dataList[0].fieldList.forEach((item: TableModel, index: number) => {
        this.filteredArray.push('');
        this.transform.push(0);
      });

      if (!this.header) {
        this.header = this.dataList[0];
      }
    }
  }

  // set Drag Status
  setDragStatus(event: MouseEvent, columnIndex: number): void {
    this.draggingColumnIndex = columnIndex;
    this.initialLeft = event.x;

    this.isDragging = true;
  }

  // stop  Drag
  stopDrag(): void {
    if (this.isDragging) {
      this.header.fieldList[this.draggingColumnIndex].columnWidth += this.transform[this.draggingColumnIndex];

      this.transform[this.draggingColumnIndex] = 0;
      this.isDragging = false;
      this.draggingColumnIndex = 0;
      this.initialLeft = 0;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const mouse = { x: event.clientX, y: event.clientY };

    if (this.isDragging) {
      const distance = mouse.x - this.initialLeft;

      this.transform[this.draggingColumnIndex] = distance;
    }
  }

  // get Total Value
  getTotalValue(columnIndex: number, format: string): string {
    let count = 0;
    this.dataList.forEach((itemRow: TableModel, indexRow: number) => {
      itemRow.fieldList.forEach((itemColumn: any, indexColumn: number) => {
        if (indexColumn === columnIndex && itemColumn.fieldValue && this.isFiltered(itemRow) && !itemRow.hidden) {
          if (isString(itemColumn.fieldValue)) {
            count += parseInt(
              itemColumn.fieldValue.replace('$', '').replace(',', '').replace('(', '').replace(')', ''),
              10
            );
          } else if (isNumber(itemColumn.fieldValue)) {
            count += itemColumn.fieldValue;
          }
        }
      });
    });

    return count.toString();
  }

  // click Filter
  clickFilter(): void {
    this.isShownFilter = !this.isShownFilter;
  }

  // is Filtered
  isFiltered(rowItem: TableModel): boolean {
    let matched = true;

    rowItem.fieldList.forEach((item: any, index: number) => {
      if (this.filteredArray[index]) {
        if (item.fieldValue.toLowerCase().indexOf(this.filteredArray[index].toLowerCase()) === -1) {
          matched = false;
        }
      }
    });

    return matched;
  }

  // click Copy
  clickCopy(): void {
    this.copyText(JSON.stringify(this.dataList[this.shownPopupIndex]));
  }

  /* To copy any Text */
  copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // click Check All
  clickCheckAll(): void {
    this.dataList.forEach((rowItem, rowIndex) => {
      // rowItem.checked = !this.checkAll;
    });
  }

  // click Single Selection
  clickSingleSelection(rowIndex: number): void {
    if (this.dataList[rowIndex].checked) {
      this.dataList[rowIndex].checked = false;
    } else {
      this.dataList[rowIndex].checked = true;
      this.dataList.forEach((listRowItem, listRowIndex) => {
        if (listRowIndex !== rowIndex) {
          listRowItem.checked = false;
        }
      });
    }
    this.clickRow.emit(this.dataList[rowIndex]);
  }

  // click Single Check
  clickSingleCheck(rowIndex: number, columnIndex: number): void {
    if (
      !this.dataList[rowIndex].fieldList[columnIndex].fieldValue &&
      !this.dataList[rowIndex].fieldList[columnIndex].readonly
    ) {
      this.dataList.forEach((listRowItem, listRowIndex) => {
        if (listRowIndex !== rowIndex) {
          listRowItem.fieldList[columnIndex].fieldValue = false;
        }
      });
    }
  }

  // click Expand Arrow
  clickExpandArrow(rowIndex: number): void {
    if (this.dataList[rowIndex].expanded) {
      this.dataList[rowIndex].expanded = false;
    } else {
      this.dataList[rowIndex].expanded = true;
      this.dataList.forEach((listRowItem, listRowIndex) => {
        if (listRowIndex !== rowIndex) {
          listRowItem.expanded = false;
        }
      });
    }
  }

  /**
   * click Sort on tables
   * @param column Name clicked column name
   */
  clickSort(column: TableHeader): void {
    if (this.sortable) {
      if (this.sortData.sortColumn !== column.sortField) {
        // click un-sorted column
        this.sortData.sortColumn = column.sortField || '';
        this.sortData.sortOrder = 'asc';
      } else {
        // click sorted column
        if (this.sortData.sortOrder === 'asc') {
          this.sortData.sortOrder = 'desc';
        } else {
          this.sortData.sortOrder = 'asc';
        }
      }

      this.changeSort.emit(this.sortData);
    }
  }
}
