import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { isString, isNumber } from 'lodash';
import { TableModel } from '../../model/table.model';

/**
 * This class represents the lazy loaded CommonTableExpandableComponent.
 */
@Component({
  selector: 'app-sd-common-table-expandable',
  templateUrl: 'common-table-expandable.component.html',
  styleUrls: ['common-table-expandable.component.scss']
})
export class CommonTableExpandableComponent implements OnInit {
  @Input() header: any = {
    fieldList: []
  };
  @Input() dataList = [] as any[];
  @Input() sortable = false;
  @Input() sortData = {
    sortColumn: '',
    sortOrder: '' // 'asc', 'desc'
  };
  @Input() popupToShow = '';
  @Input() expandedType = ''; // 'ClaimsHistoryClaims', 'ClaimsHistoryRemits', 'ProfessionalClaims'

  @Output() changeSort: EventEmitter<any> = new EventEmitter();
  @Output() clickTableOptions: EventEmitter<string> = new EventEmitter();
  @Output() clickFirstColumnCell: EventEmitter<number> = new EventEmitter();

  checkAll = false;
  shownPopupIndex = -1;
  isShownFilter = false; // false

  /**
   * init
   */
  ngOnInit(): void {
    if (this.dataList.length > 0 && !this.header) {
      this.header = this.dataList[0];
    }
  }

  // get Total Value
  getTotalValue(columnIndex: number, format: string): string {
    let count = 0;
    this.dataList.forEach((itemRow: TableModel, indexRow: number) => {
      itemRow.fieldList.forEach((itemColumn: any, indexColumn: number) => {
        if (indexColumn === columnIndex && itemColumn.fieldValue !== '' && !itemRow.hidden) {
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
    this.isShownFilter = true;
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
      this.shownPopupIndex = -1;
    } else {
      this.dataList[rowIndex].checked = true;
      this.shownPopupIndex = rowIndex;
      this.dataList.forEach((listRowItem, listRowIndex) => {
        if (listRowIndex !== rowIndex) {
          listRowItem.checked = false;
        }
      });
    }
  }

  // click Single Check
  clickSingleCheck(rowIndex: number, columnIndex: number): void {
    if (!this.dataList[rowIndex].fieldList[columnIndex].fieldValue) {
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
  clickSort(columnName: string): void {
    if (this.sortable) {
      if (this.sortData.sortColumn !== columnName) {
        // click un-sorted column
        this.sortData.sortColumn = columnName;
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
