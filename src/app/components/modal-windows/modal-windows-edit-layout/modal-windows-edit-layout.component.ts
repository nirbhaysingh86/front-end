import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { trim, toLower, every, findIndex, pullAllBy, concat } from 'lodash';
import { LayoutResponse } from '../../../model/responses/getLayoutsResponse.model';
import { ColumnResponse } from '../../../model/responses/getWorklistColumnsResponse.model';

interface CheckableColumn {
  id?: number;
  fieldName: string;
  location: number;
  width: number;
  isVisible: boolean;
  checked: boolean;
}

@Component({
  selector: 'app-sd-modal-windows-edit-layout',
  templateUrl: 'modal-windows-edit-layout.component.html',
  styleUrls: ['modal-windows-edit-layout.component.scss']
})
export class ModalWindowsEditLayoutComponent implements OnInit {
  get selectedColumns(): CheckableColumn[] {
    return this.filteredColumns.filter((c) => c.checked);
  }

  get allChecked(): boolean {
    return every(this.checkableColumns, 'checked');
  }

  @Input() modalData = {
    name: ''
  };
  @Input() initialValue: LayoutResponse = {
    id: 0,
    name: '',
    description: '',
    isDefault: false,
    columns: []
  };
  @Input() allColumns: ColumnResponse[] = [];

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();
  @Output() clickSaveLayout: EventEmitter<any> = new EventEmitter();

  checkableColumns: CheckableColumn[] = [];
  filteredColumns: CheckableColumn[] = [];
  searchKeyword = '';
  layoutName = '';
  description = '';
  checkUseThisAsMyDefaultLayout = false;

  /**
   * init
   */
  ngOnInit(): void {
    this.layoutName = this.initialValue.name;
    this.description = this.initialValue.description;
    this.checkUseThisAsMyDefaultLayout = this.initialValue.isDefault;
    this.checkableColumns = this.allColumns.map((c, i) => ({
      fieldName: c.dataField,
      location: i,
      width: 100,
      isVisible: true,
      checked: false
    }));
    pullAllBy(this.checkableColumns, this.initialValue.columns, 'fieldName');
    this.checkableColumns = concat(
      this.initialValue.columns.map((c) => ({
        ...c,
        checked: true
      })),
      this.checkableColumns
    );
    this.initialValue.columns.forEach((c) => {
      const index = findIndex(this.checkableColumns, ['fieldName', c.fieldName]);
      if (index >= 0) {
        this.checkableColumns.splice(index, 1, {
          ...c,
          checked: true
        });
      }
    });
    this.onSearch('');
  }

  /**
   * check if form is valid
   * @returns valid or not
   */
  isFormValid(): boolean {
    return trim(this.layoutName) !== '' && trim(this.description) !== '' && this.selectedColumns.length > 0;
  }

  /**
   * close Modal
   */
  closeModal(): void {
    this.closeModalWindow.emit();
  }

  /**
   * search columns
   * @param value text to search
   */
  onSearch(value: string): void {
    this.searchKeyword = value;
    this.filteredColumns = this.checkableColumns.filter((c) =>
      toLower(c.fieldName).includes(toLower(this.searchKeyword))
    );
  }

  /**
   * check/uncheck all columns
   * @param value checked or not
   */
  checkAll(value: boolean): void {
    this.checkableColumns.forEach((c) => {
      c.checked = value;
    });
  }

  /**
   * remove all selected columns
   */
  clearAll(): void {
    this.checkAll(false);
  }

  /**
   * create new layout or update existing layout
   */
  saveLayout(): void {
    this.clickSaveLayout.emit({
      id: this.initialValue.id,
      name: this.layoutName,
      description: this.description,
      isDefault: this.checkUseThisAsMyDefaultLayout,
      columns: this.selectedColumns.map((c, i) => ({
        ...c,
        location: i
      }))
    });
  }
}
