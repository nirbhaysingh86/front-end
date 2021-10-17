import { Component, Input } from '@angular/core';
import { TableModel } from '../../../model/table.model';
import { TableHeadersModel } from '../../../model/tableHeaders.model';

/**
 * This class represents the lazy loaded TabClaimsHistoryComponent.
 */
@Component({
  selector: 'app-sd-tab-claims-history',
  templateUrl: 'tab-claims-history.component.html',
  styleUrls: ['tab-claims-history.component.scss']
})
export class TabClaimsHistoryComponent {
  @Input() dataListClaims: TableModel[] = [];
  @Input() headerClaims?: TableHeadersModel;
  @Input() dataListRemits: TableModel[] = [];
  @Input() headerRemits?: TableHeadersModel;
}
