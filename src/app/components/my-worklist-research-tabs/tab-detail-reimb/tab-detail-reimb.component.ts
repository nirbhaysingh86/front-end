import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { TableHeadersModel } from '../../../model/tableHeaders.model';

/**
 * This class represents the lazy loaded TabClaimsHistoryComponent.
 */
@Component({
  selector: 'app-sd-tab-detail-reimb',
  templateUrl: 'tab-detail-reimb.component.html',
  styleUrls: ['tab-detail-reimb.component.scss']
})
 
export class TabDetailReimbComponent implements OnInit {
  @Input() dataList: TableModel[] = [];
  @Input() header?: TableHeadersModel;

  ngOnInit() {
    this.dataList;
  }
}
