import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded DraggableLineComponent.
 */
@Component({
  selector: 'app-sd-draggable-line',
  templateUrl: 'draggable-line.component.html',
  styleUrls: ['draggable-line.component.scss']
})
export class DraggableLineComponent {
  @Input() collapsedDraggableLine = false;
  @Output() clickDraggableLine: EventEmitter<any> = new EventEmitter();
}
