import { Component, Input } from '@angular/core';

/**
 * This class represents the lazy loaded LeftSidebarComponent.
 */
@Component({
  selector: 'app-sd-left-sidebar',
  templateUrl: 'left-sidebar.component.html',
  styleUrls: ['left-sidebar.component.scss']
})
export class LeftSidebarComponent {
  @Input() menuCollapsed = false;
}
