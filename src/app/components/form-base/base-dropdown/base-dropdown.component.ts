import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded BaseDropdownComponent.
 */
@Component({
  selector: 'app-sd-base-dropdown',
  templateUrl: 'base-dropdown.component.html',
  styleUrls: ['base-dropdown.component.scss']
})
export class BaseDropdownComponent {
  @Input() className = '';
  @Input() selectedOption: any = '';
  @Input() placeholder = '';
  @Input() options: any[] = [];
  @Input() fieldName = '';

  @Output() changeDropdown: EventEmitter<any> = new EventEmitter();
}
