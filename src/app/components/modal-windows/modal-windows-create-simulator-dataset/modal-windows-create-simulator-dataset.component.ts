import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded ModalWindowsCreateSimulatorDatasetComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-create-simulator-dataset',
  templateUrl: 'modal-windows-create-simulator-dataset.component.html',
  styleUrls: ['modal-windows-create-simulator-dataset.component.scss']
})
export class ModalWindowsCreateSimulatorDatasetComponent {
  @Input() modalData = {
    name: ''
  };

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  formData = {
    name: ''
  };

  // is Form Valid
  isFormValid(): boolean {
    return this.formData.name !== '';
  }

  /**
   * close Modal
   */
  closeModal(isSave: boolean): void {
    this.closeModalWindow.emit(isSave);
  }
}
