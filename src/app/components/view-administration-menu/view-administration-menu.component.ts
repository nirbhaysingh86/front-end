import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded ViewAdministrationMenuComponent.
 */
@Component({
  selector: 'app-sd-view-administration-menu',
  templateUrl: 'view-administration-menu.component.html',
  styleUrls: ['view-administration-menu.component.scss']
})
export class ViewAdministrationMenuComponent {
  @Input() menuCollapsed = false;
  @Input() hasData = false;
  @Input() hasSelection = false;
  @Output() clickMenu: EventEmitter<any> = new EventEmitter();
  @Output() clickNewView: EventEmitter<any> = new EventEmitter();
  @Output() clickEdit: EventEmitter<void> = new EventEmitter();
  @Output() clickDelete: EventEmitter<void> = new EventEmitter();
  @Output() clickLogout: EventEmitter<void> = new EventEmitter();

  isOpenedHelp = false;

  // click Help
  clickHelp(): void {
    this.isOpenedHelp = !this.isOpenedHelp;
  }
}
