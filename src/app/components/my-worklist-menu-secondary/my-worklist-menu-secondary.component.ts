import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { cloneDeep, find } from 'lodash';
import { LayoutResponse } from 'src/app/model/responses/getLayoutsResponse.model';
import { ViewLimitOptionsModel } from '../../model/viewLimitOptions.model';
import { ViewLimitsModel } from '../../model/viewLimits.model';
import { SystemValueModel } from '../../model/systemValue.model';

/**
 * This class represents the lazy loaded MyWorklistMenuSecondaryComponent.
 */
@Component({
  selector: 'app-sd-my-worklist-menu-secondary',
  templateUrl: 'my-worklist-menu-secondary.component.html',
  styleUrls: ['my-worklist-menu-secondary.component.scss']
})
export class MyWorklistMenuSecondaryComponent implements OnInit {
  @Input() dataListColumnSettings = [] as LayoutResponse[];
  @Input() set selectedLayout(layout: LayoutResponse | undefined) {
    this.columnConfiguration = layout;
  }

  get selectedLayout(): LayoutResponse | undefined {
    return this.columnConfiguration;
  }

  @Output() clickSaveColumnSettings: EventEmitter<LayoutResponse> = new EventEmitter();

  @Input() viewLimitOptions: ViewLimitOptionsModel = {
    auditor: [],
    followUp: [],
    status: [],
    accountAge: [],
    hiddenRecords: []
  };
  @Input() selectedLimits: ViewLimitsModel = {};
  @Output() selectedLimitsChange: EventEmitter<ViewLimitsModel> = new EventEmitter();

  dataListColumnSettingsShown = [] as LayoutResponse[];

  fieldSelectionIndex = -1;

  isOpened = false;

  columnConfiguration?: LayoutResponse;

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.dataListColumnSettingsShown = cloneDeep(this.dataListColumnSettings);
    if (this.selectedLayout) {
      this.columnConfiguration = find(this.dataListColumnSettingsShown, ['id', this.selectedLayout.id]);
    }
  }

  // click Manage Column
  clickManageColumn(isSave: boolean): void {
    if (isSave) {
      this.dataListColumnSettings = cloneDeep(this.dataListColumnSettingsShown);
      this.clickSaveColumnSettings.emit(this.columnConfiguration);
    }
    this.isOpened = !this.isOpened;
  }

  // click Up Arrow
  clickUpArrow(): void {
    if (this.columnConfiguration) {
      const column = this.columnConfiguration.columns.splice(this.fieldSelectionIndex, 1)[0];
      this.fieldSelectionIndex--;
      this.columnConfiguration.columns.splice(this.fieldSelectionIndex, 0, column);
    }
  }

  // click Down Arrow
  clickDownArrow(): void {
    if (this.columnConfiguration) {
      const column = this.columnConfiguration.columns.splice(this.fieldSelectionIndex, 1)[0];
      this.fieldSelectionIndex++;
      this.columnConfiguration.columns.splice(this.fieldSelectionIndex, 0, column);
    }
  }

  /**
   * change view limit action
   * @param type limit type
   * @param value target value
   */
  changeLimit(type: string, value: SystemValueModel): void {
    this.selectedLimitsChange.emit({
      ...this.selectedLimits,
      [type]: value
    });
  }
}
