import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded ViewAdministrationDefaultComponent.
 */
@Component({
  selector: 'app-sd-view-administration-default',
  templateUrl: 'view-administration-default.component.html',
  styleUrls: ['view-administration-default.component.scss']
})
export class ViewAdministrationDefaultComponent {
  @Input() activeMenu = '';
  @Output() clickNewView: EventEmitter<any> = new EventEmitter();
}
