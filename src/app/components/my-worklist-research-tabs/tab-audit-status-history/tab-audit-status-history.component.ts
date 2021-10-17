import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { TableHeadersModel } from '../../../model/tableHeaders.model';

/**
 * This class represents the lazy loaded TabClaimsHistoryComponent.
 */
@Component({
  selector: 'app-sd-tab-audit-status-history',
  templateUrl: 'tab-audit-status-history.component.html',
  styleUrls: ['tab-audit-status-history.component.scss']
})
 
export class TabtabAditStatusHistoryComponent implements OnInit {
  @Input() dataList: TableModel[] = [];
  @Input() header?: TableHeadersModel;

  ngOnInit() {
    this.dataList;
  }
}
